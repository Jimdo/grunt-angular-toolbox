module.exports = function() {
  'use strict';

  return {
    options: {
      ignores: ['**/*.coffee'],
      jshintrc: true,
    },
    src: [
      '<%= angularToolbox.files.src.js %>',
      '<%= angularToolbox.files.test.unit %>',
      '<%= angularToolbox.files.test.e2e %>',
      '<%= angularToolbox.files.styleCheck %>'
    ]
  };
};
