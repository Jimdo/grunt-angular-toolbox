/* global __dirname */
module.exports = function(grunt) {
  'use strict';

  grunt.file.setBase(__dirname + '/../');

  var helpers = require('./helpers');
  var config = helpers.getConfig();

  /* Load grunt tasks from NPM packages */
  require('load-grunt-tasks')(grunt);

  grunt.registerTask(
    'test',
    'Execute all the tests',
    function(suite) {
      var tasks = ['test:before', 'jshint', 'ngtemplates'];

      if (!suite || suite === 'unit') {
        process.env.defaultBrowsers = 'Firefox,Chrome';
        tasks.push(
          'test:unit:before',
          'shell:deleteCoverages',
          'karma:all',
          'test:unit:after'
        );
      }
      if (!suite || suite === 'e2e') {
        tasks.push(
          'test:e2e:before',
          'connect:test',
          'protractor:single',
          'test:e2e:after'
        );
      }

      tasks.push('test:after');
      grunt.task.run(tasks);
    }
  );

  grunt.registerTask(
    'tdd',
    'Watch source and test files and execute tests on change',
    function(suite) {
      var tasks = ['tdd:before'];
      var watcher = '';
      if (!suite || suite === 'unit') {
        tasks.push('tdd:unit:before', 'karma:watch:start');
        watcher = 'watch:andTestUnit';
      }
      if (!suite || suite === 'e2e') {
        tasks.push('tdd:e2e:before', 'connect:test', 'protractor_webdriver');
        watcher = 'watch:andTestE2e';
      }
      if (!suite) {
        watcher = 'watch:andTestBoth';
      }
      if (!suite || suite === 'unit') {
        tasks.push('shell:triggerTests');
      }

      tasks.push(watcher);
      grunt.task.run(tasks);
    }
  );

  grunt.registerTask('demo', 'Start the demo app', [
    'demo:before',
    'ngtemplates:dist',
    'connect:demo',
    'concurrent:demo'
  ]);

  grunt.registerTask('demo:e2e', 'Start the e2e test app', [
    'demo:e2e:before',
    'ngtemplates:dist',
    'concurrent:demoE2e'
  ]);

  grunt.registerTask('coverage', 'Serve coverage report', [
    'coverage:before',
    'connect:coverage'
  ]);

  grunt.registerTask(
    'build',
    'Build dist files',
    [
      'build:before',
      'ngtemplates:dist',
      'less:dist',
      'less:distmin',
      'concat:dist',
      'ngAnnotate:dist',
      'uglify:dist',
      'build:after'
    ]
  );

  grunt.registerTask('release', 'Test, bump, build and release.', function(type) {
    grunt.task.run([
      'release:before',
      'test',
      'npm-contributors',
      'bump-only:' + (type || 'patch'),
      'build',
      'bump-commit',
      'release:after'
    ]);
  });

  grunt.registerTask('default', 'Test', ['test']);


  /* Fallbacks to be overwritten */
  grunt.registerTask('test:before', 'overwrite this', []);
  grunt.registerTask('test:unit:before', 'overwrite this', []);
  grunt.registerTask('test:e2e:before', 'overwrite this', []);
  grunt.registerTask('test:after', 'overwrite this', []);
  grunt.registerTask('test:unit:after', 'overwrite this', []);
  grunt.registerTask('test:e2e:after', 'overwrite this', []);

  grunt.registerTask('tdd:before', 'overwrite this', []);
  grunt.registerTask('tdd:unit:before', 'overwrite this', []);
  grunt.registerTask('tdd:e2e:before', 'overwrite this', []);

  grunt.registerTask('demo:before', 'overwrite this', []);
  grunt.registerTask('demo:e2e:before', 'overwrite this', []);

  grunt.registerTask('coverage:before', 'overwrite this', []);

  grunt.registerTask('build:before', 'overwrite this', []);
  grunt.registerTask('build:after', 'overwrite this', []);

  grunt.registerTask('release:before', 'overwrite this', []);
  grunt.registerTask('release:after', 'overwrite this', []);


  grunt.initConfig(config);

  grunt.file.setBase(helpers.config.projectDir);

  helpers.additionalPeons(grunt);
};
