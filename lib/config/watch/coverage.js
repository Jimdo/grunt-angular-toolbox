module.exports = function() {
  'use strict';

  return {
    files: [
      '<%= connect.coverage.options.base %>**'
    ],
    tasks: [],
    options: {
      livereload: '<%= angularToolbox.livereloadPort %>'
    }
  };
};
