module.exports = function(grunt) {
  'use strict';

  var preprocessors = {};
  var coverageReporter = {};
  var reporters = grunt.config('angularToolbox.unitReporters');

  if (grunt.config('angularToolbox.coverage')) {
    grunt.config('angularToolbox.files.src.js').forEach(function(file) {
      preprocessors[file] = ['coverage'];
    });
    coverageReporter.reporters = [{
      type: 'json',
      dir: '<%= angularToolbox._.folder.coverage %>/unit'
    }];
    reporters.push('coverage');
  }
  preprocessors['**/*.coffee'] = ['coffee'];

  return {
    options: {
      preprocessors: preprocessors,
      coverageReporter: coverageReporter,
      reporters: reporters,
      singleRun: true,
      frameworks: [
        'jasmine'
      ],
      files: '<%= angularToolbox.files.test.unitSuite %>'
    },
    all: {
      options: {
        browsers: '<%= angularToolbox.unitBrowsers %>'
      }
    },
    tdd: {
      options: {
        background: true,
        singleRun: false,
        autoWatch: false,
        browsers: '<%= angularToolbox.unitBrowsers %>'
      },
    }
  };
};
