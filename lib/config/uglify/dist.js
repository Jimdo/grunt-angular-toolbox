module.exports = function() {
  'use strict';

  return {
    options: {
      banner: '<%= angularToolbox.template.bannerMin %>'
    },
    src: '<%= concat.dist.dest %>',
    dest: '<%= angularToolbox.folder.dist %>/<%= pkg.name %>.min.js'
  };
};
