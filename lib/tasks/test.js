module.exports = function() {
  'use strict';

  return {
    description: [
      'run both: unit and e2e tests',
      '  options:',
      '    --no-coverage     (Default: false)',
      '    --no-jshint       (Default: false)',
      '    --unit-browsers   (Default: Chrome,Firefox,PhantomJS)',
      '    --e2e-browsers    (Default: Chrome)',
      '    --unit-reporters  (Default: progress)',
      '  Environment Variables:',
      '    KARMA_BROWSERS      (Default: Chrome,Firefox,PhantomJS)',
      '    PROTRACTOR_BROWSERS (Default: Chrome)',
      '    KARMA_REPORTERS     (Default: progress)'
    ],
    run: [
      'concurrent:test',
      {
        if: 'angularToolbox.coverage',
        task: [
          'makeReport'
        ]
      }
    ]
  };
};
