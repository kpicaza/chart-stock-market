var Promise = require('rsvp').Promise;
var Company = require('./company');

function CompanyRepository(gateway, client, emitter) {

  var vm = this;
  var factory = function (id, symbol, company, createdAt) {
    return new Company(id, symbol, company, createdAt);
  };

  var resolveStartDate = function (start) {
    if (!start) {
      start = new Date();
      start.setMonth(start.getMonth() - 1);
    }

    return start.toISOString();
  };

  this.symbols = function () {

    return new Promise(function (resolve, reject) {
      gateway({}, 'find', 99, 0).then(function (companies) {
        var symbols = companies.map(function (company) {
          return company.symbol;
        });

        resolve(symbols);
      }).catch(function (e) {
        reject(e);
      });
    });

  };

  this.historical = function (symbols, start) {

    start = resolveStartDate(start);
    var end = new Date()
    end = end.toISOString();

    return new Promise(function (resolve, reject) {
      client.findHistoricalForSymbols(symbols, start, end)
        .then(function (data) {
          resolve(data);
        })
        .catch(function (e) {
          reject(e);
        });
    });

  };

  this.bySymbol = function (symbol) {

    return new Promise(function (resolve, reject) {
      client.findCompanyBySymbol(symbol).then(function (company) {
        resolve(factory(null, symbol, company));
      }).catch(function (e) {
        reject(e);
      });
    });

  };

  this.all = function () {
    return new Promise(function (resolve, reject) {
      gateway({}, 'find', 99, 0).then(function (companies) {
        resolve(companies.map(function (company) {
          return factory(company.id, company.symbol, company.info, company.createdAt);
        }));
      });
    });
  };

  this.add = function (symbol) {
    return new Promise(function (resolve, reject) {
      var error = function (e) {
        reject(e);
      };

      gateway({symbol: symbol}, 'find').then(function (companies) {
        if (0 < companies.length) {
          return reject(new Error('Company already exist.'))
        }

        vm.bySymbol(symbol).then(function (company) {
          gateway(company, 'insert').then(function () {
            emitter.emit('CompanyWasAdded', {
              name: 'CompanyWasAdded',
              data: company,
              occurredOn: new Date()
            });

            resolve(company);
          }).catch(error);
        }).catch(error);

      }).catch(error);
    });

  };

  this.remove = function (id) {

    return new Promise(function (resolve, reject) {
      gateway(id, 'remove').then(function () {
        resolve();
      }).catch(function (e) {
        reject(e);
      });
    });

  };

}

module.exports = CompanyRepository;
