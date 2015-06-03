module.exports = function() {
  'use strict';

  return {
    description: [
      'Run tests,',
      '(if successful) bump version build project,',
      'commit changes and push to origin.',
      '  options:',
      '    <see test>',
      '  Environment Variables:',
      '    <see test>'
    ],
    run: [
      'test',
      'update-contributors',
      'bump',
      'build'
    ],
    runFilter: function(tasks, args) {
      var type = args[0];
      tasks.splice(tasks.indexOf('bump'), 1, 'bump-only:' + (type || 'patch'));
      tasks.push('bump-commit');
      return tasks;
    }
  };
};
