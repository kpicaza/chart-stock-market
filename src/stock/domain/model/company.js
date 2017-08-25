
var uuid5 = require('uuid5');

function Company(id, symbol, info, createdAt) {

  createdAt = createdAt instanceof Date ? createdAt : new Date();
  id = id || uuid5(createdAt.toString());

  this.id = function () {
    return id;
  };

  this.symbol = function () {
    return symbol;
  };

  this.info = function () {
    return info;
  };

  this.createdAt = function () {
    return createdAt.toISOString();
  }

}

module.exports = Company;
