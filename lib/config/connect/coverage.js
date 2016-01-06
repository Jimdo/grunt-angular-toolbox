module.exports = function() {
  'use strict';

  return {
    options: {
      hostname: '*',
      port: '<%= angularToolbox.coveragePort %>',
      base: [
        '<%= angularToolbox._.folder.tmp %>/coverageReport/lcov-report/',
      ],
      livereload: '<%= angularToolbox.livereloadPort %>',
      open: true
    }
  };
};
