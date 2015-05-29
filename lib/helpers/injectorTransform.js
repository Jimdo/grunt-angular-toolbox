module.exports = function(path, grunt) {
  'use strict';

  var JS_TAG = '<script src=":filename.js"></script>';
  var STYLE_TAG = '<link rel="stylesheet" href=":filename.css">';

  return function(file) {
    var tmpDir = grunt.template.process('<%= angularToolbox._.folder.tmp %>');
    file = file.replace(tmpDir, '');

    var ext = path.extname(file);
    var tag;
    if (['.css', '.scss', '.sass', '.less'].indexOf(ext) !== -1) {
      tag = STYLE_TAG;
    } else if (ext === '.js') {
      tag = JS_TAG;
    }

    return tag.replace(':filename', file.replace(ext, ''));
  };
};
