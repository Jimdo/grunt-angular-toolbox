module.exports = function() {
  'use strict';

  return {
    tasks: [
      'shell:openDemoE2e',
      'connect:e2eSandbox:keepalive'
    ]
  };
};
