var root = this;

// AMD Loader
if (typeof define === 'function' && define.amd) {
  define(function () {
    'use strict';
    return slowdown;
  });

// CommonJS/nodeJS Loader
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = slowdown;

// Regular Browser loader
} else {
  root.slowdown = slowdown;
}
