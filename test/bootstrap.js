//.webstorm.bootstrap.js
var chai = require('chai');
global.chai = chai;
global.expect = chai.expect;
global.slowdown = require('../.build/slowdown.js');
global.getDefaultOpts = require('./optionswp.js').getDefaultOpts;
