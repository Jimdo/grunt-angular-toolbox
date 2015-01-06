module.exports = (grunt) ->

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    'angular-toolbox': {}
  });

  #* we need to fake another base dir for grunt task loading
  #* for this sample project since the node_modules
  #* are in the parent folder.
  #* no need to do that in a 'real project'.
  grunt.file.setBase __dirname + '/../'
  require('load-grunt-tasks') grunt
  grunt.file.setBase __dirname

  require('../lib/index').addTasks()
