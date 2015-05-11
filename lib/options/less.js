var helpers = require('../helpers');
var lessSrc = helpers.getFiles('src.less');
var config = {
  dist: {},
  distmin: {}
};

if (lessSrc) {
  var dest = helpers.getFolder('internal.tmp', 'build/less/style.css');
  config.dist = {
    src: lessSrc,
    dest: dest
  };
}

module.exports = config;
