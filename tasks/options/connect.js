var optPort = require('grunt').option('port');
var helpers = require('../helpers');
var connectLess = require('connect-less');
var mkdirp = require('mkdirp');

var baseDirs = [
  helpers.getFolder('internal.project'),
  helpers.getFolder('internal.tmp')
];

/* create temp folders for demos */
mkdirp(helpers.getFolder('internal.tmp', 'demo/'));
mkdirp(helpers.getFolder('internal.tmp', 'src/less/'));

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
      base: helpers.getFolder('internal.tmp', 'coverage/lcov-report'),
      keepalive: true,
      open: true
    }
  }
};
