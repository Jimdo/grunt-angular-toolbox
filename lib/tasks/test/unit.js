module.exports = function() {
  'use strict';

  return {
    description: [
      'execute unit tests',
      '  options:',
      '    --no-coverage     (Default: false)',
      '    --no-jshint       (Default: false)',
      '    --no-jscs         (Default: false)',
      '    --unit-browsers   (Default: Chrome,Firefox,PhantomJS)',
      '    --unit-reporters  (Default: progress)',
      '  Environment Variables:',
      '    KARMA_BROWSERS    (Default: Chrome,Firefox,PhantomJS)',
      '    KARMA_REPORTERS   (Default: progress)'
    ],
    options: {
      watch: 'angularToolbox.watch',
      coverage: 'angularToolbox.coverage',
      jscs: 'angularToolbox.jscs',
      jshint: 'angularToolbox.jshint',
      'unit-browsers': {
        env: 'KARMA_BROWSERS',
        alias: [
          'unit-browser',
          'browsers',
          'browser',
        ],
        type: 'array',
        key: 'angularToolbox.unitBrowsers'
      },
      'unit-reporters': {
        env: 'KARMA_REPORTERS',
        alias: [
          'unit-reporter',
          'reporters',
          'reporter'
        ],
        type: 'array',
        key: 'angularToolbox.unitReporters'
      }
    },
    run: [
      {
        if: 'angularToolbox.watch',
        task: 'karma:tdd:start',
        else: 'runtest:unit'
      },
      {
        if: 'angularToolbox.watch',
        task: [
          'shell:triggerTests',
          'watch:unit'
        ]
      }
    ]
  };
};
