module.exports = function(grunt, injectorTransform) {
  'use strict';

  var coverage = grunt.config('angularToolbox.coverage');

  return {
    options: {
      template: '<%= angularToolbox.folder.e2eSandbox %>index.html',
      transform: injectorTransform
    },
    files: {
      '<%= angularToolbox.folder.e2eSandbox %>index.html': [
        coverage ? '<%= angularToolbox._.files.instrumentedJs %>' :
          '<%= angularToolbox.files.src.js %>',
        '<%= angularToolbox._.files.ngTemplates %>',
        '<%= angularToolbox.files.src.less %>',
        '<%= angularToolbox.files.src.sass %>'
      ],
    }
  };
};
