module.exports = function() {
  'use strict';

  return {
    src: [
      '<%= angularToolbox.files.src.js %>',
      '<%= angularToolbox.files.test.unit %>',
      '<%= angularToolbox.files.test.e2e %>',
      '<%= angularToolbox.files.styleCheck %>'
    ]
  };
};
