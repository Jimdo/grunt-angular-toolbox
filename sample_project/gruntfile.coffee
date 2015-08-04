module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    'angularToolbox': {
      demoAutoprefixer: false
    }
  });

  require('../tasks/init');
