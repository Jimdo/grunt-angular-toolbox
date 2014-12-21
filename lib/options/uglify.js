var helpers = require('../helpers');

module.exports = {
  dist: {
    options: {
      banner: helpers.getTemplate('bannerMin')
    },
    src: '<%= concat.dist.dest %>',
    dest: helpers.getFolder('dist', '<%= pkg.name %>.min.js')
  }
};
