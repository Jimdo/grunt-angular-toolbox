module.exports = function() {
  'use strict';

  return {
    description: [
      'execute unit tests',
      '  options:',
      '    --no-coverage   (default: false)',
      '    --no-saucelabs  (default: false)',
      '    --e2e-browsers  (default: Chrome)',
      '  Environment Variables:',
      '    PROTRACTOR_BROWSERS (default: Chrome)'
    ],
    options: {
      watch: 'angularToolbox.watch',
      coverage: 'angularToolbox.coverage',
      saucelabs: {
        env: 'GAT_USE_SAUCELABS',
        key: 'angularToolbox.saucelabs'
      },
      'e2e-browsers': {
        env: 'PROTRACTOR_BROWSERS',
        alias: [
          'e2e-browser',
          'browsers',
          'browser',
        ],
        type: 'array',
        key: 'angularToolbox.e2eBrowsers'
      }
    },
    run: [
      'shell:updateWebdriver',
      {
        if: 'angularToolbox.watch',
        task: [
          'shell:triggerTests',
          'watch:e2e'
        ],
        else: 'runtest:e2e'
      }
    ]
  };
};
