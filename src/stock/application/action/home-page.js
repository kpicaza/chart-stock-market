function HomePage(repository) {

  this.action = function (req, res) {

    repository.all().then(function (companies) {
      res.render('stock/index', {
        title: 'Express',
        companies: companies
      });
    });

  };

}

module.exports = HomePage;
