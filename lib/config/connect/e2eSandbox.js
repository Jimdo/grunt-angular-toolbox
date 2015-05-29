module.exports = function(connectMiddleware) {
  'use strict';

  return {
    options: {
      hostname: '*',
      port: '<%= angularToolbox.e2eSandboxPort %>',
      middleware: connectMiddleware,
      base: [
        '<%= angularToolbox._.folder.tmp %>',
        '<%= angularToolbox._.folder.projectBase %>',
        '<%= angularToolbox._.folder.base %>',
        '<%= angularToolbox.folder.e2eSandbox %>'
      ],
      livereload: true
    }
  };
};
