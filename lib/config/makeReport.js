module.exports = function() {
  'use strict';

  return {
    options: {
      type: 'lcov',
      dir: '<%= angularToolbox._.folder.coverageReport %>',
      print: 'text-summary'
    },
    src: '<%= angularToolbox._.folder.coverage %>/**/*.json'
  };
};
