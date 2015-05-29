module.exports = function() {
  'use strict';

  return {
    src: '<%= concat.distStylesMin.dest %>',
    dest: '<%= concat.distStylesMin.dest %>'
  };
};
