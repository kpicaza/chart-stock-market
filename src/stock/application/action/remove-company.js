
function RemoveCompany(repository) {

  this.action = function (req, res) {

    repository.remove(req.params.id).then(function () {
      res.send();
    }).catch(function (e) {
      res.status(404).send(e);
    });

  };

}

module.exports = RemoveCompany;
