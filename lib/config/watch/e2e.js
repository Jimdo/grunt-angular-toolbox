module.exports = function() {
  'use strict';

  return {
    files: [
      '<%= angularToolbox.files.src.js %>',
      '<%= angularToolbox.files.src.less %>',
      '<%= angularToolbox.files.src.sass %>',
      '<%= angularToolbox.folder.partials %>/**/*.html',
      '<%= angularToolbox.files.test.e2e %>',
      '<%= angularToolbox.folder.e2eSandbox %>/**/*'
    ],
    tasks: ['runtest:e2e']
  };
};
