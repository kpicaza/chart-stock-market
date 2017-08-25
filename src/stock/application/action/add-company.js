
function AddCompany(repository) {

  this.action = function (req, res) {

    repository.add(req.body.symbol.toUpperCase()).then(function (company) {
      res.json({
        id: company.id(),
        symbol: company.symbol(),
        info: company.info()
      });
    }).catch(function (e) {
      res.status(400).send(e);
    });

  };

}

module.exports = AddCompany;
