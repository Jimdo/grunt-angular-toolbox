module.exports = function() {
  'use strict';

  return {
    src: '<%= angularToolbox.files.src.less %>',
    dest: '<%= angularToolbox._.folder.tmp %>/build/less/style.css'
  };
};
