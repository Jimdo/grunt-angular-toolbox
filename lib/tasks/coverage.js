module.exports = function() {
  'use strict';

  return {
    description: [
      'serve coverage report',
      'requires `grunt test` to have been run once',
      '  options:',
      '    --port|coveragePort-port  (default: 7000)',
      '    --livereload-port         (default: 35729)',
      '  Environment Variables:',
      '    COVERAGE_PORT             (default: 7000)',
      '    LIVERELOAD_PORT           (default: 35729)'
    ],
    options: {
      'coveragePort-port': {
        env: 'COVERAGE_PORT',
        alias: 'port',
        key: 'angularToolbox.coveragePort'
      },
      'livereload-port': {
        env: 'LIVERELOAD_PORT',
        key: 'angularToolbox.livereloadPort'
      }
    },
    run: [
      'connect:coverage',
      'watch:coverage'
    ]
  };
};
