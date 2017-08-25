(function () {

  var ws = new WebSocket('ws://localhost:8080', 'echo-protocol');
  var apiUrl = appUrl + '/api/companies';
  var running = false;
  var main = $('#main');
  var symbolInput = $('#company-symbol');
  var submitButton = $('#add-company');
  var modal = $('#modal1');
  var cardToClone = $('.company-card');
  var chartCompanies = $('#chart-companies');
  var equalDivs = $('.card-content');

  var sendMessage = function(data){
    var message = JSON.stringify(data);
    ws.send(message);
  };

  var drawCard = function(company) {
    var card = cardToClone.clone();
    if (1 < card.length) {
      card = card.last().clone();
    }

    card.find('.card-title').text(company.info.name);
    card.removeClass('hide');
    chartCompanies.prepend(card);
    equalDivs = $('.card-content');
    equalDivs.matchHeight();
    running = false;
  };

  ajaxFunctions.ready(function () {
    $('.modal').modal();
    equalDivs.matchHeight();
  });

  submitButton.bind('click', function (e) {
    if (running) {
      return;
    }
    running = true;

    e.preventDefault();

    ajaxFunctions.ajaxRequest('POST', apiUrl, {
      symbol: symbolInput.val()
    }, function (data) {
      sendMessage(data);
      modal.modal('close');
      symbolInput.val('');
    }, function () {
      running = false;
      symbolInput.addClass('invalid');
    });
  });

  ws.addEventListener("message", function(e) {
    // The data is simply the message that we're sending back
    var msg = e.data;

    drawCard(JSON.parse(msg));
    main.trigger('CompanyWasAdded');
  });


})();
