module.exports = function(injectorTransform) {
  'use strict';

  return {
    options: {
      template: '<%= angularToolbox.folder.demo %>index.html',
      transform: injectorTransform
    },
    files: {
      '<%= angularToolbox.folder.demo %>index.html': [
        '<%= angularToolbox.files.src.js %>',
        '<%= angularToolbox._.files.ngTemplates %>',
        '<%= angularToolbox.files.src.less %>',
        '<%= angularToolbox.files.src.sass %>'
      ],
    }
  };
};
