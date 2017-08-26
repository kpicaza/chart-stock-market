(function () {

  var apiUrl = appUrl + '/api/companies/';
  var main = $('#main');
  var removeButton = $(".delete-company");

  var sendMessage = function(data){
    data.type = 'remove-company';
    var message = JSON.stringify(data);
    ws.send(message);
  };

  var bindRemove = function () {
    removeButton.bind('click', function (e) {
      e.preventDefault();

      var button = $(e.target).closest('a');
      var id = button.data('id');

      ajaxFunctions.ajaxRequest('DELETE', apiUrl + id, {}, function () {
        sendMessage({ id: id });
      }, function (e) {
        console.error(e);
      });
    });
  };

  ajaxFunctions.ready(function () {
    bindRemove();
  });

  main.bind('CompanyWasAdded', function () {
    removeButton = $('.delete-company');
    removeButton.unbind();
    bindRemove();
  });

  main.bind('CompanyWasRemoved', function (e, id) {
    console.log(id);
    main.find('[data-id="' + id + '"]').closest('.company-card').remove();
  });

  ws.addEventListener("message", function(e) {
    // The data is simply the message that we're sending back
    var msg = JSON.parse(e.data);

    if ('remove-company' === msg.type) {
      console.log('soket', msg.id);
      main.trigger('CompanyWasRemoved', [msg.id]);
    }

  });

})();
