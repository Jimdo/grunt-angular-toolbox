module.exports = function() {
  'use strict';

  return {
    options: {
      logConcurrentOutput: true
    },
    tasks: ['watch:partials', 'watch:demo', 'shell:openDemo']
  };
};
