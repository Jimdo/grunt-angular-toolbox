#!/usr/bin/env node

function cli() {

  var findup = require('findup-sync');
  var path = require('path');
  var spawn = require('child_process').spawn;
  var gruntBin = path.join(__dirname, '../node_modules/.bin/grunt');
  var projectRoot;
  var peonsfile;

  peonsfile = findup('peonsfile.+(js|coffee)', {nocase: true});

  if (!peonsfile) {
    console.error(new Error('Unable to find a peonsfile.'));
    return;
  }

  projectRoot = path.dirname(peonsfile);

  process.argv.splice(0, 2);

  spawn(
    gruntBin,
    [
      '--gruntfile',
      path.join(__dirname, 'mainpeons.js'),
      '--projectDir',
      projectRoot
    ].concat(process.argv),
    {
      stdio: 'inherit'
    }
  );
}

module.exports = {
  cli: cli
};
