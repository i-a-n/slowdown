/**
 * Created by Estevao on 08-06-2015.
 */
var bootstrap = require('./makemarkdown.bootstrap.js'),
    slowdown = bootstrap.slowdown,
    assertion = bootstrap.assertion,
    issues = bootstrap.getTestSuite('test/functional/makemarkdown/cases/features/issues/'),
    ghMentions = bootstrap.getTestSuite('test/functional/makemarkdown/cases/features/ghMentions/');

describe('makeMarkdown() features testsuite', function () {
  'use strict';

  describe('issues', function () {
    for (var i = 0; i < issues.length; ++i) {
      var converter;
      if (issues[i].name === '#164.4.tasklists') {
        converter = new slowdown.Converter({tasklists: true});
      } else {
        converter = new slowdown.Converter();
      }
      it(issues[i].name.replace(/-/g, ' '), assertion(issues[i], converter));
    }
  });

  describe('ghMentions', function () {
    var converter = new slowdown.Converter({ ghMentions: true });
    for (var i = 0; i < ghMentions.length; ++i) {
      it(ghMentions[i].name.replace(/-/g, ' '), assertion(ghMentions[i], converter));
    }
  });
});
