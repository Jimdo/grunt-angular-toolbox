var helpers = require('../helpers');
var grunt = require('grunt');
var DEFAULT_BROWSERS = 'Chrome,Firefox,PhantomJS';
var browsers = process.env.KARMA_BROWSERS;
var reporters = process.env.KARMA_REPORTERS;
var coverageFolder = helpers.getFolder('internal.tmp', 'coverage/unit');
var coverage = !grunt.option('no-coverage');

var preprocessors = {};
if (coverage) {
  preprocessors['src/**/*.+(js|coffee)'] = ['coverage'];
}
preprocessors['**/*.coffee'] = ['coffee'];

var coverageReporter = {};
if (coverage) {
  coverageReporter.reporters = [{
    type: 'json',
    dir: coverageFolder
  }];
}

var reporters = (reporters || 'progress').split(',');
if (coverage) {
  reporters.push('coverage');
}


module.exports = {
  options: {
    browsers: (browsers || 'Chrome').split(','),
    preprocessors: preprocessors,
    frameworks: [
      'jasmine'
    ],
    coverageReporter: coverageReporter,
    reporters: reporters,
    singleRun: true,
    files: helpers.getFiles('environments.karma')
      .concat(helpers.getFiles('test.unit'))
  },
  all: {
    options: {
      browsers: (browsers || DEFAULT_BROWSERS).split(',')
    }
  },
  watch: {
    options: {
      background: true,
      singleRun: false,
      autoWatch: false
    }
  }
};
