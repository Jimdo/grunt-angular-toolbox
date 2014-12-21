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
    tasks: wrapHooks(['shell:deleteCoverages', 'ngtemplates:dist', 'karma:watch:run'], 'unit')
  },
  andTestE2e: {
    files: e2eTestFiles,
    tasks: wrapHooks(['ngtemplates:dist', 'protractor:tdd'], 'e2e'),
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
        ['karma:watch:run'],
        'unit'
    )).concat(wrapHooks(
        ['protractor:tdd'],
        'e2e'
    )),
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
