//.webstorm.bootstrap.js
var chai = require('chai');
var jsdom = require('jsdom');

global.chai = chai;
global.expect = chai.expect;
global.slowdown = require('../.build/slowdown.js');
global.getDefaultOpts = require('./optionswp.js').getDefaultOpts;
global.jsdomDocument = new jsdom.JSDOM('').window.document;
