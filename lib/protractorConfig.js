/* global jasmine */

'use strict';

var reporter = process.env.PROTRACTOR_REPORTERS;

var capabilities = JSON.parse(process.env.GAT_PROTRACTOR_CAPABILITIES);
var reporter = JSON.parse(process.env.GAT_PROTRACTOR_REPORTER);

/* Add coffeescript support */
require('coffee-script').register();

/* See subtasks/protractor.js for config */
/* We still need to set some config thats not supported by grunt-protractor-runner */
var config = {
  multiCapabilities: capabilities,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 360000
  },
  onPrepare: function() {
    switch (reporter) {
      case 'spec':
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(
          new SpecReporter({displayStacktrace: true})
        );
        break;
    }
  }
};

if (
  process.env.USE_SAUCELABS !== 'false' &&
  process.env.USE_SAUCELABS !== '0' &&
  process.env.SAUCE_USERNAME &&
  process.env.SAUCE_ACCESS_KEY
) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
}

if (reporter) {
  /* disable default reporter if custom is set */
  config.jasmineNodeOpts.print = function() {};
}

exports.config = config;
