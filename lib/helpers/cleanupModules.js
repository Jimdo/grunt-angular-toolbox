module.exports = function connectMiddleWareFactory(grunt) {
  'use strict';

  var lf = grunt.util.linefeed;

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  return function(src, filepath) {
    /* Normalize line-feeds */
    src = grunt.util.normalizelf(src);

    /* Remove jshint comments */
    src = src.replace(/[\s]*\/\* (jshint|global).*\n/g, '');

    /* Trim */
    src = trim(src);

    /* Indent */
    src = src.split(lf).map(function(line) {
      return trim(line).length ? '  ' + line : '';
    }).join(lf);

    /* ensure relative path */
    filepath = filepath.replace(
      grunt.config('angularToolbox._.folder.projectBase'),
      ''
    );

    return '  // ' + filepath + lf + src;
  };
};
