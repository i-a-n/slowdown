/**
 * Created by Tivie on 21/12/2016.
 */
'use strict';
var fs = require('fs'),
    slowdown = require('../../.build/slowdown.js'),
    converter = new slowdown.Converter(),
    pkg = require('../../package.json'),
    performance = require('./lib/performance.lib.js');

performance.setLibraryName(pkg.name);
performance.setVersion(pkg.version);
performance.setGithubLink('https://github.com/slowdownjs/slowdown/tree/');

var globals = {
      gHtmlBlocks:     [],
      gHtmlMdBlocks:   [],
      gHtmlSpans:      [],
      gUrls:           {},
      gTitles:         {},
      gDimensions:     {},
      gListLevel:      0,
      hashLinkCounts:  {},
      langExtensions:  [],
      outputModifiers: [],
      converter:       converter,
      ghCodeBlocks:    []
    },
    options = slowdown.getOptions();

function runTests () {
  var testMDFile = fs.readFileSync('test/performance.testfile.md', 'utf8');
  new performance.Suite('Basic')
    .setOption('cycles', 50)
    .add('Simple "Hello World"', function () {
      converter.makeHtml('*Hello* **World**!');
    })
    .add('performance.testfile.md', {
      prepare: function () {
        return testMDFile;
      },
      test: function (mdText) {
        converter.makeHtml(mdText);
      }
    });
  new performance.Suite('subParsers')
    .setOption('cycles', 20)
    .add('hashHTMLBlocks', function () {
      slowdown.subParser('makehtml.hashHTMLBlocks')(testMDFile, options, globals);
    })
    .add('anchors', function () {
      slowdown.subParser('makehtml.links')(testMDFile, options, globals);
    })
    .add('blockQuotes', function () {
      slowdown.subParser('makehtml.blockQuotes')(testMDFile, options, globals);
    })
    .add('codeBlocks', function () {
      slowdown.subParser('makehtml.codeBlocks')(testMDFile, options, globals);
    })
    .add('codeSpans', function () {
      slowdown.subParser('makehtml.codeSpans')(testMDFile, options, globals);
    })
    .add('detab', function () {
      slowdown.subParser('makehtml.detab')(testMDFile, options, globals);
    })
    .add('encodeAmpsAndAngles', function () {
      slowdown.subParser('makehtml.encodeAmpsAndAngles')(testMDFile, options, globals);
    })
    .add('encodeBackslashEscapes', function () {
      slowdown.subParser('makehtml.encodeBackslashEscapes')(testMDFile, options, globals);
    })
    .add('encodeCode', function () {
      slowdown.subParser('makehtml.encodeCode')(testMDFile, options, globals);
    })
    .add('escapeSpecialCharsWithinTagAttributes', function () {
      slowdown.subParser('makehtml.escapeSpecialCharsWithinTagAttributes')(testMDFile, options, globals);
    })
    .add('githubCodeBlocks', function () {
      slowdown.subParser('makehtml.githubCodeBlocks')(testMDFile, options, globals);
    })
    .add('hashBlock', function () {
      slowdown.subParser('makehtml.hashBlock')(testMDFile, options, globals);
    })
    .add('hashElement', function () {
      slowdown.subParser('makehtml.hashElement')(testMDFile, options, globals);
    })
    .add('hashHTMLSpans', function () {
      slowdown.subParser('makehtml.hashHTMLSpans')(testMDFile, options, globals);
    })
    .add('hashPreCodeTags', function () {
      slowdown.subParser('makehtml.hashPreCodeTags')(testMDFile, options, globals);
    })
    .add('headers', function () {
      slowdown.subParser('makehtml.headers')(testMDFile, options, globals);
    })
    .add('horizontalRule', function () {
      slowdown.subParser('makehtml.horizontalRule')(testMDFile, options, globals);
    })
    .add('images', function () {
      slowdown.subParser('makehtml.images')(testMDFile, options, globals);
    })
    .add('italicsAndBold', function () {
      slowdown.subParser('makehtml.italicsAndBold')(testMDFile, options, globals);
    })
    .add('lists', function () {
      slowdown.subParser('makehtml.lists')(testMDFile, options, globals);
    })
    .add('outdent', function () {
      slowdown.subParser('makehtml.outdent')(testMDFile, options, globals);
    })
    .add('paragraphs', function () {
      slowdown.subParser('makehtml.paragraphs')(testMDFile, options, globals);
    })
    .add('spanGamut', function () {
      slowdown.subParser('makehtml.spanGamut')(testMDFile, options, globals);
    })
    .add('strikethrough', function () {
      slowdown.subParser('makehtml.strikethrough')(testMDFile, options, globals);
    })
    .add('stripLinkDefinitions', function () {
      slowdown.subParser('makehtml.stripLinkDefinitions')(testMDFile, options, globals);
    })
    .add('tables', function () {
      slowdown.subParser('makehtml.tables')(testMDFile, options, globals);
    })
    .add('unescapeSpecialChars', function () {
      slowdown.subParser('makehtml.unescapeSpecialChars')(testMDFile, options, globals);
    });
}

function generateLogs () {
  performance.generateLog(null, null, true);
}

module.exports = {
  runTests: runTests,
  generateLogs: generateLogs
};
