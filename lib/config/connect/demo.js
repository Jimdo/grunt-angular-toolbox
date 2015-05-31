module.exports = function(connectMiddleware) {
  'use strict';

  return {
    options: {
      hostname: '*',
      port: '<%= angularToolbox.demoPort %>',
      middleware: connectMiddleware,
      base: [
        '<%= angularToolbox._.folder.tmp %>',
        '<%= angularToolbox._.folder.projectBase %>',
        '<%= angularToolbox._.folder.base %>',
        '<%= angularToolbox.folder.demo %>'
      ],
      livereload: true
    }
  };
};
