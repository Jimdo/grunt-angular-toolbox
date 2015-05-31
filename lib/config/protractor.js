module.exports = function(_, path, grunt) {
  'use strict';

  var capabilities = [];
  grunt.config('angularToolbox.e2eBrowsers').forEach(function(browser) {
    capabilities.push({browserName: browser.toLowerCase()});
  });
  /* Workaround until https://github.com/teerapap/grunt-protractor-runner/pull/62 */
  process.env.GAT_PROTRACTOR_CAPABILITIES = JSON.stringify(capabilities);
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
