/* global process, __dirname */
var grunt = require('grunt');
var util = grunt.util;
var lf = util.linefeed;
var _ = util._;
var getNamespace = util.namespace.get;
var projectConfig = grunt.config('angular-toolbox') || {};
var projectDir = process.cwd();
var fs = require('fs');
var path = require('path');
var helpers = {};
var base = path.resolve(__dirname, '..');
var glob = require('glob');
var loadedConfigs = {};

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

helpers.projectDir = projectDir;

var getFiles = helpers.getFiles = function(files) {
  return getNamespace(require('./files'), files);
};

var getFolder = helpers.getFolder = function(folderName) {
  var rest = [].slice.call(arguments, 1);
  var folder = getFiles(folderName + 'Folder');

  if (!folder) {
    throw new Error('undefined Folder "' + folderName + 'Folder"');
  }

  return path.join.apply(
    path.join,
    [folder].concat(rest)
  );
};

helpers.normalizeCoverageTask = function() {
  var done = this.async();

  /* sometimes karma takes a little time to write the report */
  setTimeout(function() {
    glob(getFolder('internal.tmp', 'coverage/unit/**/*.json'), function(err, coverageFiles) {
      if (err) {
        done(err);
        return;
      }

      coverageFiles.forEach(function(coverageFile) {
        var normalizedCoverage = {};
        var coverage = require(coverageFile);
        var srcFile;

        for (srcFile in coverage) {
          if (coverage[srcFile]) {
            normalizedCoverage[srcFile.replace('./src/js', 'src/js')] = coverage[srcFile];
          }
        }

        fs.writeFileSync(coverageFile, JSON.stringify(normalizedCoverage));
      });

      done();
    });

  }, 100);
};

var getProjectConfig = helpers.getProjectConfig = function(path, fallback) {
  var value = getNamespace(projectConfig, path);
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
  var fallback = path.join(base, './lib/templates/' + name + '.tpl');
  var templateFile = template ? path.resolve(projectDir, template) : fallback;

  if (fs.existsSync(templateFile)) {
    template = fs.readFileSync(templateFile, 'utf8');
  }

  return template;
};

var resolveAssets = helpers.resolveAssets = function(filesGlobs, cwd) {
  if (!cwd) {
    cwd = getFolder('internal.project');
  }

  var base = getFolder('internal.base');
  var allFiles = [];

  filesGlobs.forEach(function(fileGlob) {
    var files = glob.sync(fileGlob, {cwd: cwd});
    files.forEach(function(file) {
      file = path.resolve(cwd, file);
      allFiles.push(path.relative(cwd, file));
    });

    if (!files.length) {
      if (cwd !== base) {
        allFiles = allFiles.concat(resolveAssets([fileGlob], base));
      } else {
        grunt.log.warn('no files found for ', fileGlob);
      }
    }
  });

  return allFiles;
};

function getScripts(env) {
  var scripts = '';
  var tag = '<script type="text/javascript" src=":src"></script>\n';

  resolveAssets(getFiles('environments.' + env)).forEach(function(file) {
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

helpers.loadConfig = function(cwd) {
  var glob = require('glob');
  var config = {};

  glob.sync('*', { cwd: cwd }).forEach(function(option) {
    try {
      var key = option.replace(/\.js$/, '');
      var optionConfigFile = path.join(cwd, option);

      config[key] = require(optionConfigFile);
    } catch (e) {
      grunt.log.error('unable to load "' + option + '"' + e);
    }
  });

  return config;
};

helpers.getTaskConfig = function(tasks) {
  var configs = {};

  tasks.forEach(function(task) {
    var option = task.split(':')[0];
    var subtask = task.split(':').splice(1).join(':');
    var config = {};

    if (!(option in loadedConfigs)) {
      loadedConfigs[option] = require('./options/' + option);
    }

    if (subtask) {
      if (loadedConfigs[option].options) {
        config.options = loadedConfigs[option].options;
      }

      if (loadedConfigs[option][subtask]) {
        config[subtask] = loadedConfigs[option][subtask];
      } else {
        grunt.log.error('no config found for "' + task + '"');
      }
    } else {
      config = loadedConfigs[option];
    }

    configs[option] = _.extend(configs[option] || {}, config);
  });

  return configs;
};

module.exports = helpers;
