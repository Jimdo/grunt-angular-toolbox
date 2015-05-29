module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    'angularToolbox': {}
  });

  require('../tasks/init');
