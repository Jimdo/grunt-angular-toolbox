module.exports = function() {
  'use strict';

  return {
    files: [
      '<%= angularToolbox.files.src.js %>',
      '<%= angularToolbox.files.src.less %>',
      '<%= angularToolbox.files.src.sass %>',
      '<%= angularToolbox.folder.partials %>/**/*.html',
      '<%= angularToolbox.files.test.unit %>'
    ],
    tasks: ['runtest:unit']
  };
};
