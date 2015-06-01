module.exports = function getDefaults(grunt, _, path, fs, merged) { // jshint ignore: line
  'use strict';

  var wiredep = require('wiredep');

  var pkg = grunt.config('pkg');

  var TEMP_DIR = '.tmp/';

  var defaults = {};

  defaults._ = {};

  /* Internal Folders */
  defaults._.folder = {};

  defaults._.folder.base = path.resolve(__dirname, '..');
  defaults._.folder.projectBase = process.cwd();
  defaults._.folder.tmp = path.resolve(defaults._.folder.base, TEMP_DIR);
  defaults._.folder.coverage = path.resolve(defaults._.folder.tmp, 'coverage');
  defaults._.folder.coverageReport = path.resolve(
    defaults._.folder.tmp,
    'coverageReport'
  );

  defaults._.folder.instrumented = path.resolve(
    defaults._.folder.tmp,
    'instrumented/'
  );

  /* Internal Files */
  defaults._.files = {};
  defaults._.files.ngTemplates = path.resolve(
    defaults._.folder.tmp,
    'ng_templates.js'
  );

  /* Public Folders */
  defaults.folder = {};

  defaults.folder.dist = 'dist/';
  defaults.folder.demo = 'demo/';
  defaults.folder.partials = 'src/partials/';
  defaults.folder.e2eSandbox = 'test/e2e/env/';

  defaults.folder.src = {};
  defaults.folder.src.js = 'src/js/';
  defaults.folder.src.sass = 'src/sass/';
  defaults.folder.src.less = 'src/less/';

  /* Public Files */
  defaults.files = {};
  defaults.files.bower = path.join(defaults._.folder.projectBase, 'bower.json');
  defaults.files.pkg = path.join(defaults._.folder.projectBase, 'package.json');
  defaults.files.protractorConfig = path.join(__dirname, 'protractorConfig.js');

  defaults.files.src = {};
  defaults.files.src.js = [
    defaults.folder.src.js + '**/helper*.js',
    defaults.folder.src.js + '**/!(helper)*.js'
  ];

  defaults.files.src.sass = [
    defaults.folder.src.sass + '**/!(_)*.scss'
  ];

  defaults.files.src.less = [
    defaults.folder.src.less + '**/!(_)*.less'
  ];

  defaults.files.test = {};

  defaults.files.test.unit = 'test/unit/**/*.+(js|coffee)';

  defaults.files.test.e2e = [
    'test/e2e/**/*Helper.+(js|coffee)',
    'test/e2e/**/*Spec.+(js|coffee)'
  ];

  defaults.files.styleCheck = [];

  /* Public Templates */

  defaults.template = {};
  defaults.template.banner = fs.readFileSync(
    path.join(__dirname, 'templates/banner.tpl'),
    'utf8'
  );
  defaults.template.bannerMin = fs.readFileSync(
    path.join(__dirname, 'templates/bannerMin.tpl'),
    'utf8'
  );
  defaults.template.wrapBottom = fs.readFileSync(
    path.join(__dirname, 'templates/wrapBottom.tpl'),
    'utf8'
  );
  defaults.template.wrapTop = fs.readFileSync(
    path.join(__dirname, 'templates/wrapTop.tpl'),
    'utf8'
  );

  /* Public Various */
  defaults.moduleName = _.camelCase(pkg.name);
  defaults.customMiddleware = false;
  defaults.coverage = true;
  defaults.jshint = true;
  defaults.jscs = true;
  defaults.watch = false;
  defaults.demoPort = 8000;
  defaults.maintainersThreshold = 15;
  defaults.dynamicAuthor = false;
  defaults.coveragePort = 7000;
  defaults.e2eSandboxPort = 8765;
  defaults.unitBrowsers = ['Chrome', 'Firefox', 'PhantomJS'];
  defaults.e2eBrowsers = ['Chrome'];
  defaults.unitReporters = ['progress'];
  defaults.e2eReporter = 'spec';
  defaults.autoprefixerBrowsers = [
    'last 5 version',
    '> 1%',
    'ie 8'
  ];

  merged(function(config) {
    config._.files.pkg = [
      config.files.bower,
      config.files.pkg
    ];

    config._.files.vendor = wiredep({
      bowerJson: require(config.files.bower)
    });

    config._.files.vendorDev = wiredep({
      bowerJson: require(config.files.bower),
      dependencies: false,
      devDependencies: true
    });

    config._.files.instrumentedJs = config.files.src.js.map(
      function(entry) {
        return path.join(config._.folder.instrumented, entry);
      }
    );

    if (!config.files.test.unitSuite) {
      config.files.test.unitSuite = [].concat(
        config._.files.vendor.js,
        config._.files.vendorDev.js,
        config.files.src.js,
        config._.files.ngTemplates,
        config.files.test.unit
      );
    }

    config.folder.coverageReport = config._.folder.coverageReport;
  });

  return defaults;
};
