module.exports = function() {
  'use strict';

  return {
    options: {
      htmlmin: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      module: '<%= angularToolbox.moduleName %>'
    },
    cwd: '<%= angularToolbox.folder.partials %>',
    src: '**/*.html',
    dest: '<%= angularToolbox._.files.ngTemplates %>'
  };
};
