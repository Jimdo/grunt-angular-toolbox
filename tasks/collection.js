var grunt = require('grunt');
var findup = require('findup-sync');
var path = require('path');
var dependencies = require('../package.json').dependencies;
var dependency;
var tasksDir;

grunt.verbose.subhead('Registering subtasks of "grunt-angular-toolbox"...');

for (dependency in dependencies) {
  if (dependency.indexOf('grunt-') === 0) {
    tasksDir = findup(path.join('node_modules', dependency, 'tasks'));
    if (tasksDir) {
      grunt.loadTasks(tasksDir);
    }
  }
}

grunt.verbose.writeln();
grunt.verbose.write('Subtasks of "grunt-angular-toolbox"...');
grunt.verbose.writeln('OK'.green);
grunt.verbose.writeln();
