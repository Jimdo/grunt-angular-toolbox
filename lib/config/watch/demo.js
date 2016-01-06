module.exports = function() {
  'use strict';

  return {
    files: [
      '<%= angularToolbox.files.src.js %>',
      '<%= angularToolbox.files.src.sass %>',
      '<%= angularToolbox.files.src.less %>',
      '<%= angularToolbox._.files.ngTemplates %>',
      '<%= angularToolbox.folder.demo %>**/*',
      '<%= angularToolbox.files.bower %>'
    ],
    tasks: ['wiredep:demo', 'injector:demo'],
    options: {
      livereload: '<%= angularToolbox.livereloadPort %>'
    }
  };
};
