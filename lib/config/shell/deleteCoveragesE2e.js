module.exports = function() {
  'use strict';

  return {
    command: [
      'rm -rf <%= angularToolbox._.folder.coverage %>/e2e',
      '&&',
      'rm -rf <%= angularToolbox._.folder.coverageReport %>'
    ].join(' ')
  };
};
