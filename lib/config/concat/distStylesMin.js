module.exports = function() {
  'use strict';

  return {
    options: {
      stripBanners: true,
      banner: '<%= angularToolbox.template.bannerMin %>'
    },
    src: '<%= concat.distStyles.src %>',
    dest: '<%= angularToolbox.folder.dist %>/<%= pkg.name %>.min.css'
  };
};
