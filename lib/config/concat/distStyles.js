module.exports = function() {
  'use strict';

  return {
    options: {
      separator: '\n',
      stripBanners: true,
      banner: '<%= angularToolbox.template.banner %>'
    },
    src: [
      '<%= less.dist.dest %>',
      '<%= sass.dist.dest %>'
    ],
    dest: '<%= angularToolbox.folder.dist %>/<%= pkg.name %>.css'
  };
};
