var yahooFinance = require('yahoo-finance');
var Promise = require('rsvp').Promise;

function FinanceClient() {

  this.findCompanyBySymbol = function (symbol) {

    return new Promise(function (resolve, reject) {
      yahooFinance.quote({
        symbol: symbol,
        modules: ['price', 'summaryProfile', 'financialData']
      }).then(function (snapshot) {
        snapshot.summaryProfile.name = snapshot.price.longName;
        snapshot.summaryProfile.currency = snapshot.price.currency;
        snapshot.summaryProfile.preClosePrice = snapshot.price.regularMarketPreviousClose;
        snapshot.summaryProfile.currentPrice = snapshot.financialData.currentPrice;

        resolve(snapshot.summaryProfile);
      }).catch(function (e) {
        reject(e);
      });
    });

  };

  this.findHistoricalForSymbols = function (symbols, start, end) {

    return new Promise(function (resolve, reject) {
      yahooFinance.historical({
        symbols: symbols,
        from: start,
        to: end
      }).then(function (data) {
        resolve(data);
      }).catch(function (e) {
        reject(e);
      });
    });

  };

}

module.exports = FinanceClient;
