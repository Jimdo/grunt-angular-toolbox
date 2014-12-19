var helpers = require('../helpers');

module.exports = {
  dist: {
    options: {
      separator: '\n\n',
      stripBanners: true,
      banner: helpers.getTemplate('banner') + helpers.getTemplate('wrapTop'),
      footer: helpers.getTemplate('wrapBottom'),
      process: helpers.cleanupModules
    },
    src: helpers.getFiles('src.js').concat(helpers.getFiles('internal.ngTemplates')),
    dest: helpers.getFolder('dist', '<%= pkg.name %>.js')
  }
};
