'use strict';

function viewGlobals(req, res, next) {

  res.locals.siteUrl = process.env.APP_URL;
  res.locals.socket = process.env.SOCKET;

  next();
}

module.exports = viewGlobals;
