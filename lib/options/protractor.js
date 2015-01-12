var grunt = require('grunt');
var helpers = require('../helpers');
var _ = grunt.util._;
var isDebug = !!grunt.option('debug');

var options = {
  collectorPort: 3001,
  debug: isDebug,
  coverageDir: helpers.getFolder('internal.tmp', 'coverage/e2e'),
  configFile: helpers.getFolder('internal.base', 'lib/protractorConfig.js'),
  keepAlive: false,
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
    options: extendOptions({})
  },
  tdd: {
    options: extendOptions({
        seleniumAddress: 'http://localhost:4444/wd/hub'
    })
  }
};
