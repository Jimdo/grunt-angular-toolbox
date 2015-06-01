module.exports = function() {
  'use strict';

  return {
    options: {
      browsers: '<%= angularToolbox.autoprefixerBrowsers %>'
    },
    src: '<%= concat.distStylesMin.dest %>',
    dest: '<%= concat.distStylesMin.dest %>'
  };
};
