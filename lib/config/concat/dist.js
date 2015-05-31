module.exports = function(cleanupModules) {
  'use strict';

  return {
    options: {
      separator: '\n\n',
      stripBanners: true,
      banner: '<%= angularToolbox.template.banner %>' +
        '<%= angularToolbox.template.wrapTop %>',
      footer: '<%= angularToolbox.template.wrapBottom %>',
      process: cleanupModules
    },
    src: [
      '<%= angularToolbox.files.src.js %>',
      '<%= angularToolbox._.files.ngTemplates %>'
    ],
    dest: '<%= angularToolbox.folder.dist %>/<%= pkg.name %>.js'
  };
};
