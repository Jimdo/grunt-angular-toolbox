module.exports = function() {
  'use strict';

  return {
    command: [
      'if [ -e $(npm bin)/webdriver-manager ]; then',
      '$(npm bin)/webdriver-manager update;',
      'elif [ -e <%= angularToolbox._.folder.base %>' +
        '/node_modules/.bin/webdriver-manager ]; then',
      '<%= angularToolbox._.folder.base %>/node_modules' +
        '/.bin/webdriver-manager update;',
      'fi'
    ].join('\n')
  };
};
