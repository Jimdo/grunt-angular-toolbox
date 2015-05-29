module.exports = function() {
  'use strict';

  return {
    options: {
      singleQuotes: true
    },
    src: '<%= concat.dist.dest %>',
    dest: '<%= concat.dist.dest %>'
  };
};
