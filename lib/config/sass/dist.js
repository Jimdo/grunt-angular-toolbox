module.exports = function() {
  'use strict';

  return {
    src: '<%= angularToolbox.files.src.sass %>',
    dest: '<%= angularToolbox._.folder.tmp %>/build/sass/style.css'
  };
};
