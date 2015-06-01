module.exports = function() {
  'use strict';

  return {
    options: {
      browsers: '<%= angularToolbox.autoprefixerBrowsers %>'
    },
    src: '<%= concat.distStyles.dest %>',
    dest: '<%= concat.distStyles.dest %>'
  };
};
