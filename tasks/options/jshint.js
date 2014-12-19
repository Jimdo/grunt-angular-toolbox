var helpers = require('../helpers');

module.exports = {
  files: helpers.getFiles('src.js')
    .concat(helpers.getFiles('test.unit'))
    .concat(helpers.getFiles('test.e2e'))
    .concat(helpers.getFiles('jshintme') || []),
  options: {
    ignores: ['**/*.coffee'],
    jshintrc: helpers.getJshintRc()
  }
};
