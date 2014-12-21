var helpers = require('../helpers');

module.exports = {
  start: {
    options: {
      path: helpers.getFolder('internal.base', 'node_modules/protractor/bin/'),
      keepAlive: true
    }
  }
};
