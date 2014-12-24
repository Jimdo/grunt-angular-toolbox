var _ = require('grunt').util._;
var helpers = require('../helpers');

var allPartials = helpers.getFolder('src.partials', '**/*.html');

var testEnvFiles = helpers.getFiles('src.js')
  .concat(helpers.getFiles('src.less'))
  .concat(allPartials);

var unitTestfiles = _.clone(testEnvFiles).concat(helpers.getFiles('test.unit'));
var e2eTestFiles = _.clone(testEnvFiles).concat(helpers.getFiles('test.e2e'));
var bothTestfiles = _.clone(unitTestfiles).concat(helpers.getFiles('test.e2e'));

var demoFiles = helpers.getFiles('src.js')
  .concat(helpers.getFiles('src.less'))
  .concat(helpers.getFiles('internal.ngTemplates'))
  .concat(helpers.getFolder('demoEnv', '**/*'));

function wrapHooks(tasks, type) {
  if (type === 'global') {
    tasks.unshift('test:before');
    tasks.push('test:after');
  } else {
    tasks.unshift(['test', type, 'before'].join(':'));
    tasks.push(['test', type, 'after'].join(':'));
  }

  return tasks;
}

module.exports = {
  andTestUnit: {
    files: unitTestfiles,
    tasks: wrapHooks([
      'shell:deleteCoverages',
      'ngtemplates:dist',
      'karma:watch:run',
      '_normalizeUnitCoverage',
      'makeReport'
    ], 'unit')
  },
  andTestE2e: {
    files: e2eTestFiles,
    tasks: wrapHooks([
      'shell:deleteCoverages',
      'ngtemplates:dist',
      'shell:deleteInstrumented',
      'instrument',
      'protractor_coverage:tdd',
      'makeReport'
    ], 'e2e'),
    options: {
      atBegin: true
    }
  },
  andTestBoth: {
    files: bothTestfiles,
    tasks: wrapHooks([
      'shell:deleteCoverages',
      'ngtemplates:dist'
    ].concat(wrapHooks(
        [
          'karma:watch:run',
          '_normalizeUnitCoverage'
        ],
        'unit'
    )).concat(wrapHooks(
        [
          'shell:deleteInstrumented',
          'instrument',
          'protractor_coverage:tdd'
        ],
        'e2e'
    )).concat('makeReport'),
    'global')
  },
  partials: {
    files: allPartials,
    tasks: ['ngtemplates:dist']
  },
  demo: {
    files: demoFiles,
    tasks: [],
    options: {
      livereload: true
    }
  }
};
