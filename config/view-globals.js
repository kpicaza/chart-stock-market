'use strict';

function viewGlobals(req, res, next) {

  res.locals.siteUrl = process.env.APP_URL;
  res.locals.socket = process.env.SOCKET + ':' + process.env.PORT;

  next();
}

module.exports = viewGlobals;
