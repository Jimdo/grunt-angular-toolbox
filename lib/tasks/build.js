module.exports = function() {
  'use strict';

  return {
    description: [
      'Concatenate, annotate and minify src files',
      '  subtasks:',
      '    :watch rebuild on src change'
    ],
    options: {
      watch: {
        grunt: ':watch',
        key: 'angularToolbox.watch'
      }
    },
    run: [
      'ngtemplates:dist',
      'less:dist',
      'sass:dist',
      'concat:dist',
      'concat:distStyles',
      'concat:distStylesMin',
      'ngAnnotate:dist',
      'uglify:dist',
      'cssmin:dist',
      {
        if: 'angularToolbox.watch',
        task: 'watch:build'
      }
    ]
  };
};
