/* global process, __dirname */
var grunt = require('grunt');
var util = grunt.util;
var _ = util._;
var lf = util.linefeed;
var fs = require('fs');
var path = require('path');
var helpers = {};
var base = process.cwd();
var glob = require('glob');
var projectConfig;
var projectDir = grunt.option('projectDir');
var getNamespace = util.namespace.get;
var additionalPeons = function() {};

/* Overwrite browser env variables if grunt options are set */
var browsers = grunt.option('browser') || grunt.option('browsers');
if (browsers) {
  process.env.KARMA_BROWSERS = browsers;
  process.env.PROTRACTOR_BROWSERS = browsers;
}

var reporters = grunt.option('reporter') || grunt.option('reporters');
if (reporters) {
  process.env.KARMA_REPORTERS = reporters;
  process.env.PROTRACTOR_REPORTERS = reporters;
}

helpers.config = {
  pkg: grunt.file.readJSON(path.join(projectDir, 'package.json')),
  projectDir: projectDir,
  env: process.env
};

function readProjectConfig() {
  var configFiles = glob.sync(
    path.join(projectDir, 'peonsfile.+(js|coffee)'),
    {nocase: true}
  );

  if (!configFiles.length) {
    projectConfig = {};
  } else {
    var config = require(configFiles[0]);
    projectConfig = config.config;
    if (_.isFunction(config)) {
      additionalPeons = config;
    }
  }
}

helpers.projectConfig = function() {
  if (!projectConfig) {
    readProjectConfig();
  }

  return projectConfig;
};

helpers.additionalPeons = function(grunt) {
  additionalPeons(grunt);
};

var getFiles = helpers.getFiles = function(files) {
  return getNamespace(require('./files'), files);
};

var getFolder = helpers.getFolder = function(folder) {
  var rest = [].slice.call(arguments, 1);

  return path.join.apply(
    path.join,
    [getFiles(folder + 'Folder')].concat(rest)
  );
};

var getProjectConfig = helpers.getProjectConfig = function(path, fallback) {
  var value = getNamespace(helpers.projectConfig(), path);
  if (typeof value === 'undefined') {
    value = fallback;
  }

  return value;
};

helpers.getModuleName = function() {
  return getProjectConfig('moduleName', '<%= pkg.name %>');
};

helpers.hasBower = function() {
  return fs.existsSync(path.join(projectDir, 'bower.json'));
};

helpers.loadConfig = function(cwd) {
  var glob = require('glob');
  var config = {};

  glob.sync('*', { cwd: cwd }).forEach(function(option) {
    var key = option.replace(/\.js$/, '');
    var optionConfigFile = path.join(cwd, option);

    // if (['bump'].indexOf(key) === -1) { return; }

    config[key] = require(optionConfigFile);
  });

  return config;
};

helpers.getJshintRc = function() {
  var jshintrcFile = getProjectConfig('jshintrc', path.join(projectDir, '.jshintrc'));
  if (fs.existsSync(jshintrcFile)) {
    return jshintrcFile;
  } else {
    return path.join(base, '.jshintrc');
  }
};

function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

helpers.cleanupModules = function(src, filepath) {
  /* Normalize line-feeds */
  src = grunt.util.normalizelf(src);

  /* Remove jshint comments */
  src = src.replace(/[\s]*\/\* (jshint|global).*\n/g, '');

  /* Trim */
  src = trim(src);

  /* Indent */
  src = src.split(lf).map(function(line) {
    return trim(line).length ? '  ' + line : '';
  }).join(lf);

  return '  // ' + filepath + lf + src;
};

helpers.getTemplate = function(name) {
  var template = getProjectConfig('templates.' + name);
  var fallback = './lib/templates/' + name + '.tpl';
  var templateFile = template ? path.resolve(projectDir, template) : fallback;

  if (fs.existsSync(templateFile)) {
    template = fs.readFileSync(templateFile, 'utf8');
  }

  return template;
};

var resolveAssets = helpers.resolveAssets = function(filesGlobs) {
  var files = [];

  filesGlobs.forEach(function(fileGlob) {
    glob.sync(fileGlob, {cwd: projectDir}).forEach(function(file) {
      file = path.resolve(projectDir, file);
      files.push(path.relative(projectDir, file));
    });
  });

  return files;
};

function getScripts() {
  var scripts = '';
  var tag = '<script type="text/javascript" src=":src"></script>\n';

  resolveAssets(getFiles('environments.demo')).forEach(function(file) {
    scripts += tag.replace(':src', file);
  });

  return scripts;
}

function getStyles() {
  var styles = '';
  var tag = '<link rel="stylesheet" type="text/css" href=":href" />\n';

  resolveAssets(getFiles('src.less')).forEach(function(file) {
    styles += tag.replace(':href', file.replace('.less', '.css'));
  });

  return styles;
}

helpers.getIndex = function(env, callback) {
  fs.readFile(getFolder(env + 'Env', 'index.html'), function(err, index) {
    callback(index.toString()
      .replace('<!-- [[src/js]] -->', getScripts(env))
      .replace('<!-- [[src/less]] -->', getStyles())
    );
  });
};

helpers.getConfig = function() {
  return _.extend(
    helpers.config,
    helpers.loadConfig(path.join(__dirname, 'options'))
  );
};

module.exports = helpers;
