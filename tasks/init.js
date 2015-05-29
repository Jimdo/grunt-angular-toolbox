/* global __dirname */
require('grunt-thrall').init({
  loadDevDependencies: false,
  loadDependencies: true,
  name: 'angularToolbox',
  dir: __dirname + '/../lib',
  grunt: require('grunt'),
  basePath: __dirname + '/..',
  module: require('../lib/helpers'),
  getDefaults: require('../lib/getDefaults')
});
