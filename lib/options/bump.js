var helpers = require('../helpers');

module.exports = {
  options: {
    files: helpers.getFiles('internal.pkg'),
    updateConfigs: ['pkg'],
    commitFiles: helpers.getFiles('internal.pkg').concat(helpers.getFolder('dist')),
    pushTo: 'origin'
  }
};
