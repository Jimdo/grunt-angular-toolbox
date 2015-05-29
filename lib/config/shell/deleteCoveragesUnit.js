module.exports = function() {
  'use strict';

  return {
    command: [
      'rm -rf <%= angularToolbox._.folder.coverage %>/unit',
      '&&',
      'rm -rf <%= angularToolbox._.folder.coverageReport %>'
    ].join(' ')
  };
};
