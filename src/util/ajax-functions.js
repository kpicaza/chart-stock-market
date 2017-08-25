'use strict';

var appUrl = window.location.origin;
var ajaxFunctions = {
  ready: function ready(fn) {
    if (typeof fn !== 'function') {
      return;
    }

    if (document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  },
  ajaxRequest: function ajaxRequest(method, url, data, callback, errorCallback) {
    $.ajax({method: method, url: url, data: data})
      .done(callback)
      .fail(errorCallback);
  }
};