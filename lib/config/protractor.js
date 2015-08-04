module.exports = function(_, path, grunt) {// jshint ignore: line
  'use strict';

  var capabilities = [];
  grunt.config('angularToolbox.e2eBrowsers').forEach(function(browser) {
    capabilities.push({
      browserName: browser.toLowerCase()
    });
  });

  var hook = grunt.config('angularToolbox.hooks.e2eCapabilities');
  if (_.isFunction(hook)) {
    capabilities = hook(capabilities);
  }

  capabilities.forEach(function(capability) {
    if (process.env.TRAVIS_JOB_NUMBER && !capability['tunnel-identifier']) {
      capability['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
    }

    if (!capability.build) {
      capability.build = grunt.config('pkg.name');
      if (process.env.TRAVIS_BUILD_NUMBER) {
        capability.build += '#' + process.env.TRAVIS_BUILD_NUMBER;
      }
    }
  });

  /* Workaround until https://github.com/teerapap/grunt-protractor-runner/pull/62 */
  process.env.GAT_PROTRACTOR_CAPABILITIES = JSON.stringify(capabilities);
  process.env.USE_SAUCELABS = grunt.config('angularToolbox.saucelabs');
  process.env.GAT_PROTRACTOR_REPORTER = JSON.stringify(
    grunt.config('angularToolbox.e2eReporter')
  );

  var options = {
    collectorPort: 3001,
    debug: '<%= angularToolbox.debug %>',
    coverageDir: '<%= angularToolbox._.folder.coverage %>/e2e',
    configFile: '<%= angularToolbox.files.protractorConfig %>',
    keepAlive: false,
    args: {
      specs: ['<%= angularToolbox.files.test.e2e %>'],
      framework: 'jasmine2',
      allScriptsTimeout: 120000
    }
  };

  return {
    single: {
      options: options
    },
    tdd: {
      options: _.merge({}, options, {args: {
        seleniumAddress: 'http://localhost:4444/wd/hub'
      }})
    }
  };
};
