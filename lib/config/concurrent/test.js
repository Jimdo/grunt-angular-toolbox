module.exports = function() {
  'use strict';

  return {
    options: {
      logConcurrentOutput: true
    },
    tasks: ['test:unit', 'test:e2e']
  };
};
