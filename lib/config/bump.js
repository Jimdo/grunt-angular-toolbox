module.exports = function() {
  'use strict';

  return {
    options: {
      files: '<%= angularToolbox._.files.pkg %>',
      updateConfigs: ['pkg'],
      commitFiles: [
        '<%= jqueryToolbox.files.bower %>',
        '<%= jqueryToolbox.files.pkg %>',
        '<%= jqueryToolbox.folder.dist %>'
      ],
      pushTo: 'origin'
    }
  };
};
