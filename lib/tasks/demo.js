module.exports = function() {
  'use strict';

  return {
    description: [
      'serve demo application',
      '  options:',
      '    --port|demo-port  (default: 8000)',
      '  Environment Variables:',
      '    DEMO_PORT         (default: 8000)'
    ],
    options: {
      'demo-port': {
        env: 'DEMO_PORT',
        alias: 'port',
        key: 'angularToolbox.demoPort'
      }
    },
    run: [
      'ngtemplates:dist',
      'wiredep:demo',
      'injector:demo',
      'connect:demo',
      'concurrent:demo'
    ]
  };
};
