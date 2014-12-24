var helpers = require('../helpers');

module.exports = {
  files: 'src/**/*.js',
  options: {
    // lazy: true,
    basePath: helpers.getFolder('internal.tmp', 'instrumented')
  }
};
