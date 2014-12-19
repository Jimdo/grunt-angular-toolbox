var grunt = require('grunt');
var helpers = require('../helpers');
var glob = require('glob');
var _ = grunt.util._;
var isDebug = !!grunt.option('debug');

var jar = helpers.getFolder(
  'internal.base',
  glob.sync('node_modules/protractor/selenium/selenium-server-standalone-2.*.jar')[0]
);

var chromeDriver = helpers.getFolder(
  'internal.base',
  glob.sync('node_modules/protractor/selenium/chromedriver')[0]
);

var options = {
  debug: isDebug,
  configFile: helpers.getFolder('internal.base', 'tasks/protractorConfig.js'),
  args: {}
};

var args = {
  specs: [helpers.getFiles('test.e2e')],
  framework: 'jasmine',
  allScriptsTimeout: 120000
};

function extendOptions(addArgs) {
  return _.extend({}, options, {args: _.extend({}, args, addArgs)});
}

module.exports = {
  single: {
    options: extendOptions({
      chromeDriver: chromeDriver,
      seleniumServerJar: jar
    })
  },
  tdd: {
    options: extendOptions({
      chromeDriver: chromeDriver,
      seleniumAddress: 'http://localhost:4444/wd/hub'
    })
  }
};
