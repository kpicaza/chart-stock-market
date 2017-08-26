(function () {

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
    data.type = 'add-company';
    var message = JSON.stringify(data);
    ws.send(message);
  };

  var drawCard = function(company) {
    var card = cardToClone.clone();
    if (1 < card.length) {
      card = card.last().clone();
    }

    var andCurrency = ' ' + company.info.currency + ' ';

    card.find('.card-title').text(company.info.name);
    card.removeClass('hide');
    card.find('.current-price').text(company.info.currentPrice + andCurrency);
    card.find('.closing-price').text(company.info.preClosePrice + andCurrency);
    card.find('.delete-company').data('id', company.id);
    if (company.info.currentPrice < company.info.preClosePrice) {
      card.find('.trend-up').hide();
    } else {
      card.find('.trend-down').hide();
    }

    chartCompanies.prepend(card);
    equalDivs = $('.card-content');
    // equalDivs.matchHeight();
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
    var msg = JSON.parse(e.data);

    if ('add-company' === msg.type) {
      drawCard(msg);
      main.trigger('CompanyWasAdded');
    }

  });


})();
