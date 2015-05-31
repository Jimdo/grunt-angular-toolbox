module.exports = function(rootTask) {
  'use strict';

  return {
    description: [
      'internal task of test:e2e'
    ],
    run: [
      {
        if: 'angularToolbox.coverage',
        task: 'shell:deleteCoveragesE2e'
      },
      'ngtemplates:dist',
      {
        if: 'angularToolbox.coverage',
        task: [
          'shell:deleteInstrumented',
          'instrument'
        ]
      },
      'wiredep:e2eSandbox',
      'injector:e2eSandbox',
      'connect:e2eSandbox',
      {
        if: 'angularToolbox.coverage',
        task: 'protractor_coverage:single',
        else: [
          'protractor:single'
        ]
      },
      {
        if: [
          'test:e2e' === rootTask,
          'angularToolbox.coverage',
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
