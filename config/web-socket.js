var WebSocketServer = require('websocket').server;

function WsServer(server) {

  var wsServer;
  var connection;
  var count = 0;
  var clients = {};

  var constructor = function (server) {
    wsServer = new WebSocketServer({
      httpServer: server
    });

    wsServer.on('request', runConnection);
  };

  constructor(server);

  function runConnection(r) {
    connection = r.accept('echo-protocol', r.origin);

    // Code here to run on connection
    // Specific id for this client & increment count
    var id = count++;
    // Store the connection method so we can loop through & contact all clients
    clients[id] = connection;
    console.log((new Date()) + ' Connection accepted [' + id + ']');

    // Create event listener
    connection.on('message', onMessage);

    connection.on('close', function (reasonCode, description) {
      delete clients[id];
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
  }

  function onMessage(message) {

    // The string message that was sent to us
    var msgString = message.utf8Data;

    // Loop through all clients
    for (var i in clients) {
      // Send a message to the client with the message
      clients[i].sendUTF(msgString);
    }

  }


}

module.exports = WsServer;
