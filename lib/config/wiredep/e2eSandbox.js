module.exports = function(grunt) {
  'use strict';

  return {
    options: {
      bowerJson: require(grunt.config('angularToolbox.files.bower'))
    },
    src: [
      '<%= angularToolbox.folder.e2eSandbox %>index.html'
    ]
  };
};
