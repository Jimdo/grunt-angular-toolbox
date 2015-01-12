module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    'angular-toolbox': {}
  });

  require('../tasks/collection');
  require('../lib/index').addTasks()
