var optPort = require('grunt').option('port');
var helpers = require('../helpers');
var connectLess = require('connect-less');
var mkdirp = require('mkdirp');
var del = require('del').sync;
var baseDirs = [
  helpers.getFolder('internal.tmp'),
  helpers.getFolder('internal.project'),
  helpers.getFolder('internal.base')
];
var lessDirs = [
  helpers.getFiles('demoEnvFolder'),
  helpers.getFiles('e2eEnvFolder'),
  'src/less/'
];
var customMiddleware = require('grunt').config('angular-toolbox').middleware;

/* reset and create temp folders for demo lessCss */
lessDirs.forEach(function(folder) {
  var tmpFolder = helpers.getFolder('internal.tmp', folder);
  del(tmpFolder, {force: true});
  mkdirp(tmpFolder);
});

function middleware(env) {
  return function(connect, options, middlewares) {
    /* Prepare index.html */
    middlewares.unshift(function addJs(req, res, next) {
      if (req.method === 'GET' && req.url === '/') {
        helpers.getIndex(env, function(index) {
          res.end(index);
        });
        return;
      }
      next();
    });

    /* Handle style requests */
    middlewares.unshift(connectLess({
      dst: helpers.getFolder('internal.tmp')
    }));

    if (customMiddleware && customMiddleware[env]) {
      middlewares = [].concat(customMiddleware[env]).concat(middlewares);
    }

    return middlewares;
  };
}

module.exports = {
  test: {
    options: {
      hostname: '*',
      port: optPort || process.env.E2E_SANDBOX_PORT || 8765,
      middleware: middleware('e2e'),
      base: baseDirs.concat(helpers.getFolder('e2eEnv'))
    }
  },
  demo: {
    options: {
      hostname: '*',
      port: optPort || process.env.DEMO_PORT || 8000,
      middleware: middleware('demo'),
      base: baseDirs.concat(helpers.getFolder('demoEnv')),
      livereload: true
    }
  },
  coverage: {
    options: {
      hostname: '*',
      port: optPort || process.env.COVERAGE_PORT || 7000,
      base: helpers.getFolder('internal.tmp', 'coverageReport/lcov-report'),
      keepalive: true,
      open: true
    }
  }
};
