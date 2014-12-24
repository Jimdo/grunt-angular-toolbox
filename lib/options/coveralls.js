var helpers = require('../helpers');

module.exports = {
  coveralls: {
    src: helpers.getFolder('internal.tmp', 'coverageReport/lcov.info')
  }
};
