(function () {

  var apiUrl = appUrl + '/api/companies';
  var ctx = document.getElementById('chart').getContext('2d');
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
          console.log(item);
          return item.close
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

  ajaxFunctions.ready(function () {
    requestData();
  });

  main.bind('CompanyWasAdded', function () {
    requestData();
  });

})();
