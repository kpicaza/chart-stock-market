var colors = require('../../../common/colors');

function HistoricalData(repository) {

  this.action = function (req, res) {

    repository.symbols().then(function (symbols) {
      if (0 === symbols.length) {
        return res.status(400).send();
      }

      repository.historical(symbols, null)
        .then(function (historical) {
          res.json({
            colors: colors(symbols.length),
            symbols: symbols,
            dates: historical[symbols[0]].map(function (data) {
              return data.date.toISOString().substr(0, 10);
            }),
            historical: historical
          });
        })
        .catch(function (e) {
          res.status(500).send(e);
        });
    }).catch(function (e) {
      res.status(500).send(e);
    });

  };

}

module.exports = HistoricalData;
