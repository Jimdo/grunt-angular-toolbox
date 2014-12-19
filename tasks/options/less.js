var helpers = require('../helpers');
var lessSrc = helpers.getFiles('src.less');

var config = {
  dist: {},
  distmin: {}
};

if (lessSrc) {
  var dest = helpers.getFolder('dist', '<%= pkg.name %>.css');
  config.dist = {
    options: {
      sourceMap: true,
      banner: helpers.getTemplate('banner')
    },
    src: lessSrc,
    dest: dest
  };

  config.distmin = {
    options: {
      banner: helpers.getTemplate('bannerMin'),
      cleancss: true
    },
    src: lessSrc,
    dest: helpers.getFolder('dist', '<%= pkg.name %>.min.css')
  };
}

module.exports = config;
