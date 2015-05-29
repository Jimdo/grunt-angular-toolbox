module.exports = function() {
  'use strict';

  return {
    options: {
      basePath: '<%= angularToolbox._.folder.instrumented %>'
    },
    files: '<%= angularToolbox.files.src.js %>',
  };
};
