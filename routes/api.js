var express = require('express');
var router = express.Router();
var container = require('../config/container');

router.route('/companies')
  .get(container.HistoricalData())
  .post(container.AddCompany());

router.route('/companies/:id')
  .delete(container.RemoveCompany());


module.exports = router;
