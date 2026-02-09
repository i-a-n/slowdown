var slowdown = require('../../.build/slowdown.js');

var ext = {
  type: 'lang',
  regex: /foo/g,
  replace: 'bar'
};

slowdown.extension('mockextension', function () {
  'use strict';
  return [ext];
});

module.exports = ext;
