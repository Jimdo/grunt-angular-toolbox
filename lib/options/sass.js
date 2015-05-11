var helpers = require('../helpers');
var sassSrc = helpers.getFiles('src.sass');
var config = {
  dist: {}
};

if (sassSrc) {
  var dest = helpers.getFolder('internal.tmp', 'build/sass/style.css');
  config.dist =  {
    src: sassSrc,
    dest: dest
  };
}

module.exports = config;
