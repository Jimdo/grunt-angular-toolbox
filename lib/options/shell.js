var optPort = require('grunt').option('port');
var helpers = require('../helpers');
var aSourceFile = helpers.resolveAssets(helpers.getFiles('src.js'))[0];
var bowerFolder = helpers.getFolder('internal.base', 'bower_components');
var bower = helpers.getFolder('internal.base', 'node_modules/.bin/bower');
var webdriverManager = helpers.getFolder('internal.base', 'node_modules/.bin/webdriver-manager');
var openDemoCmd = 'sleep 1 && open http://localhost:';

module.exports = {
  triggerTests: {
    command: '(sleep 1 && touch ' + aSourceFile + ') > /dev/null 2>&1 &'
  },
  openDemo: {
    command: openDemoCmd + (optPort || process.env.DEMO_PORT || 8000) + '/'
  },
  openDemoE2e: {
    command: openDemoCmd + (optPort || process.env.E2E_SANDBOX_PORT || 8765) + '/'
  },
  deleteCoverages: {
    command: [
      'rm -rf',
      helpers.getFolder('internal.tmp', 'coverage')
    ].join(' ')
  },
  updateWebdriver: {
    command: webdriverManager + ' update'
  },
  bower: {
    command: [
      'if [ ! -d ' + bowerFolder + ' ]; then',
      '(cd ' + helpers.getFolder('internal.base') + ' && ' + bower + ' install)',
      'fi'
    ].join(' ')
  }
};
