module.exports = function() {
  'use strict';

  return {
    description: [
      'serve coverage report',
      'requires `grunt test` to have been run once',
      '  options:',
      '    --port|coveragePort-port  (default: 7000)',
      '  Environment Variables:',
      '    COVERAGE_PORT             (default: 7000)'
    ],
    options: {
      'coveragePort-port': {
        env: 'COVERAGE_PORT',
        alias: 'port',
        key: 'angularToolbox.coveragePort'
      },
    },
    run: [
      'connect:coverage',
      'watch:coverage'
    ]
  };
};
