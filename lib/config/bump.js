module.exports = function() {
  'use strict';

  return {
    options: {
      files: '<%= angularToolbox._.files.pkg %>',
      updateConfigs: ['pkg'],
      commitFiles: [
        '<%= angularToolbox._.files.pkg %>',
        '<%= angularToolbox.folder.dist %>/**/*'
      ],
      pushTo: 'origin'
    }
  };
};
