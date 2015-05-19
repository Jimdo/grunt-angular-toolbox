module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    'angular-toolbox': {
      jshintrc: true
    }
  });

  require('../tasks/collection');
