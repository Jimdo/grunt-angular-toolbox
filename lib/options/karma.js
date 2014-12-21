var helpers = require('../helpers');
var DEFAULT_BROWSERS = 'Chrome,Firefox,PhantomJS';
var browsers = process.env.KARMA_BROWSERS;
var reporters = process.env.KARMA_REPORTERS;
var coverageFolder = helpers.getFolder('internal.tmp', 'coverage/');


module.exports = {
  options: {
    browsers: (browsers || 'Chrome').split(','),
    preprocessors: {
      'src/**/*.+(js|coffee)': ['coverage'],
      '**/*.coffee': ['coffee']
    },
    frameworks: [
      'jasmine'
    ],
    coverageReporter: {
      reporters: [{
        type: 'lcov',
        dir: coverageFolder,
        subdir: '.'
      }, {
        dir: coverageFolder,
        type: 'text-summary'
      }]
    },
    reporters: (reporters || 'progress').split(',').concat('coverage'),
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
