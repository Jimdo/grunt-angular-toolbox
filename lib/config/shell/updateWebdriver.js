module.exports = function() {
  'use strict';

  return {
    command: [
      '<%= angularToolbox._.folder.base %>/node_modules/.bin/webdriver-manager',
      'update'
    ].join(' ')
  };
};
