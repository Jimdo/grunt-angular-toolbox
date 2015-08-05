module.exports = function(grunt, path) {
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

      grunt.registerTask('_checkToolboxVersion', function() {
        var semver = require('semver');
        var toolboxPkg = require(
          path.join(
            grunt.config('angularToolbox._.folder.base'),
            'package.json'
          )
        );
        var requiredRange = grunt.config('pkg')
          .devDependencies[toolboxPkg.name];
        var currentVersion = toolboxPkg.version;

        if (!semver.satisfies(currentVersion, requiredRange)) {
          throw new Error('Currently installed version ' + currentVersion +
            ' of ' + toolboxPkg.name + ' does not satisfy required range ' +
            requiredRange);
        }
      });

      tasks.unshift('_checkToolboxVersion');
      tasks.splice(tasks.indexOf('bump'), 1, 'bump-only:' + (type || 'patch'));
      tasks.push('bump-commit');

      return tasks;
    }
  };
};
