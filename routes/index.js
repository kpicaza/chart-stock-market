var express = require('express');
var router = express.Router();
var container = require('../config/container');

/* GET home page. */
router.get('/', container.HomePage());

module.exports = router;
