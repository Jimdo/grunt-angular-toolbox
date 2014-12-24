/* global __dirname */
var util = require('grunt').util;
var _ = util._;
var path = require('path');
var helpers = require('./helpers');
var getProjectConfig = helpers.getProjectConfig;
var files = {};


/* SRC
 ***************/
files.src = {};

files.src.js = getProjectConfig('files.src.js', [
  'src/js/helper.module.js',
  'src/js/**/!(helper)*.js'
]);

files.src.less = getProjectConfig('files.src.less', [
  'src/less/**/*.less'
]);

files.src.partialsFolder = getProjectConfig('files.src.partialsFolder', 'src/partials/');


/* VENDOR
 ***************/
files.vendor = {};

var vendorJs = files.vendor.js = getProjectConfig('files.vendor.js') || {};
files.vendor.css = getProjectConfig('files.vendor.css') || [];


/* TEST FILES
 ***************/
files.test = {};

files.test.unit = getProjectConfig('files.test.unit', [
  'test/unit/SpecHelper.+(js|coffee)',
  'test/unit/**/*Spec.+(js|coffee)'
]);

files.test.e2e = getProjectConfig('files.test.e2e', [
  'test/e2e/SpecHelper.+(js|coffee)',
  'test/e2e/**/*Spec.+(js|coffee)'
]);


/* DEMO FOLDER
 ***************/
files.demoEnvFolder = getProjectConfig('files.demoEnvFolder', 'demo/');


/* E2E DEMO FOLDER
 ***************/
files.e2eEnvFolder = getProjectConfig('files.e2eEnvFolder', 'test/e2e/env/');


/* DIST FOLDER
 ***************/
files.distFolder = getProjectConfig('files.distFolder', 'dist/');

/* INTERNAL
 ***************/

var tmpFolderName =  '.tmp/';
var ngTemplates = path.join(tmpFolderName, 'ng_templates.js');

files.internal = {};

files.internal.projectFolder = helpers.config.projectDir;

var baseFolder = files.internal.baseFolder = path.resolve(__dirname, '../');

files.internal.tmpFolder = path.join(baseFolder, tmpFolderName);

files.internal.pkg = ['package.json'];
if (helpers.hasBower()) {
  files.internal.pkg.push('bower.json');
}

files.internal.ngTemplates = path.join(baseFolder, ngTemplates);


/* ENVIRONMENTS
 ***************/
files.environments = {};

var bowerFolder = 'bower_components';
var bowerAngular = path.join(bowerFolder, 'angular/angular.js');

var baseEnvironment = getProjectConfig('envFilter', function(env) { return env; })(
  [].concat(
    vendorJs.top || [],
    bowerAngular,
    vendorJs.angularModules || [],
    files.src.js,
    ngTemplates,
    vendorJs.bottom || []
  )
);

var demoEnvironment = _.clone(baseEnvironment);
var demoEnvironmentE2e = _.clone(baseEnvironment);
var karmaEnvironment = _.clone(baseEnvironment);

karmaEnvironment.unshift(path.join(baseFolder, bowerFolder, '/jasmine-moar-matchers/lib/*.js'));
karmaEnvironment.push(path.join(baseFolder, bowerFolder, '/angular-mocks/angular-mocks.js'));
karmaEnvironment = karmaEnvironment.map(function(file) {
  switch(file) {
    case bowerAngular:
    case ngTemplates:
      return path.join(baseFolder, file);
    default:
      return file;
  }
});

demoEnvironmentE2e = demoEnvironmentE2e.map(function(file) {
  if (file.indexOf('src/js') === 0) {
    return file.replace('src/js', '.tmp/instrumented/src/js');
  }
  return file;
});

files.environments.demo = demoEnvironment;
files.environments.e2e = demoEnvironmentE2e;
files.environments.karma = karmaEnvironment;


/* EXPORTSCHLAGER
 ***************/
module.exports = files;
