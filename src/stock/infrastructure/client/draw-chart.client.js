(function () {

  var apiUrl = appUrl + '/api/companies';
  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');
  var main = $('#main');

  var requestData = function () {
    ajaxFunctions.ajaxRequest('GET', apiUrl, {
      start: null
    }, function (data) {
      drawChart(data);
    }, function (e) {
      console.error(e);
    });
  };

  var drawChart = function (data) {
    var datasets = data.symbols.map(function (symbol, i) {
      return {
        backgroundColor: data.colors[i],
        borderColor: data.colors[i],
        fill: false,
        label: symbol,
        data: data.historical[symbol].reverse().map(function (item) {
          return item.close.toFixed(2);
        })
      };
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates.reverse(),
        datasets: datasets
      }
    });

  };

  ajaxFunctions.ready(requestData);

  main.bind('CompanyWasAdded', requestData);

  main.bind('CompanyWasRemoved', requestData);

})();
