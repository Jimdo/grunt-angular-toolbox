module.exports = function() {
  'use strict';

  return {
    description: [
      'serve e2e sandbox application',
      '  options:',
      '    --port|e2e-sandbox-port  (default: 8765)',
      '    --no-instrumented        (default: false)',
      '    --livereload-port        (default: 35729)',
      '  Environment Variables:',
      '    E2E_SANDBOX_PORT         (default: 8765)',
      '    LIVERELOAD_PORT          (default: 35729)'
    ],
    options: {
      instrumented: 'angularToolbox.coverage',
      'e2e-sandbox-port': {
        env: 'E2E_SANDBOX_PORT',
        alias: 'port',
        key: 'angularToolbox.e2eSandboxPort'
      },
      'livereload-port': {
        env: 'LIVERELOAD_PORT',
        key: 'angularToolbox.livereloadPort'
      }
    },
    run: [
      {
        if: 'angularToolbox.coverage',
        task: [
          'instrument'
        ]
      },
      'ngtemplates:dist',
      'wiredep:e2eSandbox',
      'injector:e2eSandbox',
      'concurrent:demoE2eSandbox'
    ]
  };
};
