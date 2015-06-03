module.exports = function() {
  'use strict';

  return {
    options: {
      files: '<%= angularToolbox._.files.pkg %>',
      updateConfigs: ['pkg'],
      commitFiles: [
        '<%= angularToolbox.files.bower %>',
        '<%= angularToolbox.files.pkg %>',
        '<%= angularToolbox.folder.dist %>'
      ],
      pushTo: 'origin'
    }
  };
};
