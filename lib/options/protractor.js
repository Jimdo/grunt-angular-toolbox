var grunt = require('grunt');
var helpers = require('../helpers');
var glob = require('glob');
var _ = grunt.util._;
var isDebug = !!grunt.option('debug');

function getSileniumJar() {
  var jar = glob.sync(
    'node_modules/protractor/selenium/selenium-server-standalone-2.*.jar',
    {cwd: helpers.getFolder('internal.base')}
  );

  if (!jar || !jar.length) {
    return false;
  }

  return helpers.getFolder(
    'internal.base',
    jar[0]
  );
}

function getChromeDriver() {
  var driver = glob.sync(
    'node_modules/protractor/selenium/chromedriver',
    {cwd: helpers.getFolder('internal.base')}
  );

  if (!driver || !driver.length) {
    return false;
  }

  return helpers.getFolder(
    'internal.base',
    driver[0]
  );
}

var options = {
  debug: isDebug,
  configFile: helpers.getFolder('internal.base', 'lib/protractorConfig.js'),
  args: {}
};

grunt.registerTask('updateProtractorConfig', function() {
  grunt.config('protractor.single.options.args.chromeDriver', getChromeDriver());
  grunt.config('protractor.tdd.options.args.chromeDriver', getChromeDriver());
  grunt.config('protractor.single.options.args.seleniumServerJar', getSileniumJar());
});
grunt.registerTask('prepareProtractor', ['shell:updateWebdriver', 'updateProtractorConfig']);

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
      chromeDriver: getChromeDriver(),
      seleniumServerJar: getSileniumJar()
    })
  },
  tdd: {
    options: extendOptions({
      chromeDriver: getChromeDriver(),
      seleniumAddress: 'http://localhost:4444/wd/hub'
    })
  }
};
