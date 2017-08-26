var mongo = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = function (data, method, limit, offset) {
  return new Promise(function (resolve, reject) {
    mongo.connect(process.env.MONGO, function (err, db) {
      if (err) {
        reject(err);
      }

      const store = new Store(db);

      // Returns Promise.
      const callable = store[method];

      callable(data, limit, offset).then(function (data) {
        resolve(data)
      });
    });
  });
};

function Store(db) {
  var vm = this;
  var collection;

  var constructor = function (db) {
    collection = db.collection('companies');
  };

  constructor(db);

  var serializeCompany = function (company) {
    return {
      id: company.id(),
      symbol: company.symbol(),
      info: company.info(),
      createdAt: company.createdAt()
    };
  };

  this.find = function (criteria, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    return new Promise(function (resolve, reject) {
      collection
        .find(criteria)
        .skip(offset)
        .limit(limit)
        .sort({createdAt: -1})
        .toArray(function (err, documents) {
          if (err) {
            db.close();
            return reject(err);
          }

          resolve(documents);

          db.close();
        });
    });
  };

  this.insert = function (company) {

    var aCompany = serializeCompany(company);

    return new Promise(function (resolve, reject) {
      collection.insert(aCompany, function (err) {
        if (err) {
          return reject(err);
        }

        resolve(vm.find({id: company.id()}, 1, 0));
      });
    });

  };

  this.remove = function (id) {
    return new Promise(function (resolve, reject) {

      collection.remove({id: id}, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  };

}
