var Emitter = require('events')
var FinanceClient = require('../src/stock/infrastructure/yahoo-finance/finance-client');
var CompanyRepository = require('../src/stock/domain/model/company-repository');
var companyGateway = require('../src/stock/infrastructure/mongo/company-store');
var HomePage = require('../src/stock/application/action/home-page');
var HistoricalData = require('../src/stock/application/action/historical-data');
var AddCompany = require('../src/stock/application/action/add-company');
var RemoveCompany = require('../src/stock/application/action/remove-company');

var container = {

  EventEmitter: function () {
    var emitter = new Emitter();

    return emitter;
  },

  FinanceClient: function () {
    return new FinanceClient();
  },

  CompanyRepository: function () {
    return new CompanyRepository(
      companyGateway,
      this.FinanceClient(),
      this.EventEmitter()
    );
  },

  HomePage: function () {
    var homePage = new HomePage(this.CompanyRepository());

    return homePage.action;
  },

  HistoricalData: function () {
    var historicalData = new HistoricalData(this.CompanyRepository());

    return historicalData.action;
  },

  AddCompany: function () {
    var addCompany = new AddCompany(this.CompanyRepository());

    return addCompany.action;
  },

  RemoveCompany: function () {
    var removeCompany = new RemoveCompany(this.CompanyRepository());

    return removeCompany.action;
  }

};

module.exports = container;
