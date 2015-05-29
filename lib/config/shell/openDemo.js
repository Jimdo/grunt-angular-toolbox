module.exports = function() {
  'use strict';

  return {
    command: 'sleep 1 && open http://localhost:<%= angularToolbox.demoPort %>'
  };
};
