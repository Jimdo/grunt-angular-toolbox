var helpers = require('../helpers');

module.exports = {
  src: helpers.getFolder('internal.tmp', 'coverage/**/*.json'),
  options: {
    type: 'lcov',
    dir: helpers.getFolder('internal.tmp', 'coverageReport'),
    print: 'text-summary'
  }
};
