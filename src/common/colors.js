'use strict';

var ColorScheme = require('color-scheme');

function makePalette(hue, length) {
  var scheme = new ColorScheme();

  return scheme.from_hue(hue)
    .scheme('contrast')
    .variation('hard')
    .colors()
    .slice(0, length)
    .map(function (color) {
      return '#' + color;
    });
}

function colors(length, hue) {

  hue = hue || 210;

  if (13 > length) {
    return makePalette(hue, length);
  }

  var palette = [];
  for (var i = 1; i < length; i + 12) {
    palette.concat(makePalette(hue, length));
    hue = hue + 50;
  }

  return palette;
}

module.exports = colors;
