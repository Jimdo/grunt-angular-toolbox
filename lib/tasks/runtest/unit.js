module.exports = function(rootTask) {
  'use strict';

  return {
    description: [
      'internal task of test:unit'
    ],
    run: [
      {
        if: 'angularToolbox.jshint',
        task: 'jshint:all'
      },
      {
        if: 'angularToolbox.jscs',
        task: 'jscs:all'
      },
      {
        if: 'angularToolbox.coverage',
        task: 'shell:deleteCoveragesUnit'
      },
      'ngtemplates:dist',
      {
        if: 'angularToolbox.watch',
        task: 'karma:tdd:run',
        else: 'karma:all'
      },
      {
        if: 'angularToolbox.coverage',
        task: 'normalizeCoverage'
      },
      {
        if: [
          'test:unit' === rootTask,
          'angularToolbox.coverage'
        ],
        task: 'makeReport'
      },
      {
        if: [
          'angularToolbox.watch',
          'angularToolbox.coverage',
        ],
        task: 'makeReport'
      }
    ]
  };
};
