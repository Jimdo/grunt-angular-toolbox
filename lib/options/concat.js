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
  },
  distStyles: {
    options: {
      separator: '\n',
      stripBanners: true,
      banner: helpers.getTemplate('banner')
    },
    src: [
      '<%= less.dist.dest %>',
      '<%= sass.dist.dest %>'
    ],
    dest: helpers.getFolder('dist', '<%= pkg.name %>.css')
  },
  distStylesMin: {
    options: {
      stripBanners: true,
      banner: helpers.getTemplate('bannerMin') + '\n'
    },
    src: '<%= concat.distStyles.src %>',
    dest: helpers.getFolder('dist', '<%= pkg.name %>.min.css')
  }
};
