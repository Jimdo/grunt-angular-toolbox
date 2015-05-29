module.exports = function() {
  'use strict';

  return {
    files: '<%= angularToolbox.folder.partials %>**/*.html',
    tasks: ['ngtemplates:dist']
  };
};
