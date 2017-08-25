
function CompanyInfo(repository) {

  this.action = function (req, res) {

    repository.bySymbol(req.params.symbol).then(function (company) {
      res.json(company);
    });

  };

}

module.exports = CompanyInfo;
