/**
 * Created by Tivie on 27/01/2017.
 */
//let slowdown = require('../../.build/slowdown.js') || require('slowdown');

describe('slowdown.options', function () {
  'use strict';

  describe('setOption() and getOption()', function () {
    it('should set option foo=bar', function () {
      slowdown.setOption('foo', 'bar');
      slowdown.getOption('foo').should.equal('bar');
      slowdown.resetOptions();
      (typeof slowdown.getOption('foo')).should.equal('undefined');
    });
  });

  describe('getDefaultOptions()', function () {
    it('should get default options', function () {
      let opts = getDefaultOpts(true);
      expect(slowdown.getDefaultOptions()).to.be.eql(opts);
    });
  });
});

describe('slowdown.extension()', function () {
  'use strict';

  let extObjMock = {
        type: 'lang',
        filter: function () {}
      },
      extObjFunc = function () {
        return extObjMock;
      };

  /*
  // very flimsy test
  describe('file loading', function () {

    beforeEach(function () {
      this.extension = require('../mocks/mock-extension');
    });

    it('should register an extension from a file', function () {
      slowdown.extension('mockextension').should.be.an('array');
      slowdown.extension('mockextension').should.eql([this.extension]);
    });

    afterEach(function () {
      slowdown.resetExtensions();
    });

  });
  */

  describe('objects', function () {
    it('should register an extension object', function () {
      slowdown.extension('foo', extObjMock);
      slowdown.extension('foo').should.eql([extObjMock]);
    });

    it('should register an extension function', function () {
      slowdown.extension('bar', extObjFunc);
      slowdown.extension('bar').should.eql([extObjMock]);
    });

    it('should register a listener extension', function () {
      slowdown.extension('baz', {
        type: 'listener',
        listeners: {
          foo: function (name, txt) {
            return txt;
          }
        }
      });
    });

    it('should refuse to register a generic object', function () {
      let fn = function () {
        slowdown.extension('foo', {});
      };
      expect(fn).to.throw();
    });

    it('should refuse to register an extension with invalid type', function () {
      let fn = function () {
        slowdown.extension('foo', {
          type: 'foo'
        });
      };
      expect(fn).to.throw(/type .+? is not recognized\. Valid values: "lang\/language", "output\/html" or "listener"/);
    });

    it('should refuse to register an extension without regex or filter', function () {
      let fn = function () {
        slowdown.extension('foo', {
          type: 'lang'
        });
      };
      expect(fn).to.throw(/extensions must define either a "regex" property or a "filter" method/);
    });

    it('should refuse to register a listener extension without a listeners property', function () {
      let fn = function () {
        slowdown.extension('foo', {
          type: 'listener'
        });
      };
      expect(fn).to.throw(/Extensions of type "listener" must have a property called "listeners"/);
    });

    afterEach(function () {
      slowdown.resetExtensions();
    });

  });

});

describe('slowdown.getAllExtensions()', function () {
  'use strict';
  let extObjMock = {
    type: 'lang',
    filter: function () {}
  };

  it('should return all extensions', function () {
    slowdown.extension('bar', extObjMock);
    slowdown.getAllExtensions().should.eql({bar: [extObjMock]});
  });
});

describe('slowdown.setFlavor()', function () {
  'use strict';
  it('should set flavor to github', function () {
    slowdown.setFlavor('github');
    slowdown.getFlavor().should.equal('github');
    slowdown.setFlavor('vanilla');
  });

  it('should set options correctly', function () {
    slowdown.setFlavor('github');
    let ghOpts = slowdown.getFlavorOptions('github'),
        shOpts = slowdown.getOptions();
    for (let opt in ghOpts) {
      if (ghOpts.hasOwnProperty(opt)) {
        shOpts.should.have.property(opt);
        shOpts[opt].should.equal(ghOpts[opt]);
      }
    }
    slowdown.setFlavor('vanilla');
  });

  it('should switch between flavors correctly', function () {
    slowdown.setFlavor('github');
    let ghOpts = slowdown.getFlavorOptions('github'),
        shOpts = slowdown.getOptions(),
        dfOpts = slowdown.getDefaultOptions();
    for (let opt in dfOpts) {
      if (ghOpts.hasOwnProperty(opt)) {
        shOpts[opt].should.equal(ghOpts[opt]);
      } else {
        shOpts[opt].should.equal(dfOpts[opt]);
      }
    }
    slowdown.setFlavor('original');
    let orOpts = slowdown.getFlavorOptions('original');
    shOpts = slowdown.getOptions();
    for (let opt in dfOpts) {
      if (orOpts.hasOwnProperty(opt)) {
        shOpts[opt].should.equal(orOpts[opt]);
      } else {
        shOpts[opt].should.equal(dfOpts[opt]);
      }
    }
    slowdown.setFlavor('vanilla');
  });
});
