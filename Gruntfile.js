module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json'],
        commitMessage: 'release v%VERSION%',
        pushTo: 'origin'
      }
    },
    'npm-publish': {
      options: {
        abortIfDirty: true,
        tag: 'latest'
      }
    },
    shell: {
      test: {
        command: [
          'cd sample_project',
          '../node_modules/.bin/grunt test',
        ].join(' && ')
      }
    },
    jshint: {
      src: [
        'lib/**/*.js',
        'tasks/**/*.js',
        '*.js'
      ],
      options: {
        jshintrc: true
      }
    },
    jscs: {
      src: '<%= jshint.src %>'
    }
  });

  /* Load grunt tasks from NPM packages */
  grunt.loadNpmTasks('grunt-npm');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'shell:test'
  ]);

  grunt.registerTask(
    'release',
    'Build, bump and publish to NPM.',
    function(type) {
      grunt.task.run([
        'test',
        'bump:' + (type || 'patch'),
        'npm-publish'
      ]);
    }
  );
};
