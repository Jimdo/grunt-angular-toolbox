module.exports = function connectMiddleWareFactory(
  _,
  fs,
  grunt,
  path,
  del,
  mkdirp
) {
  'use strict';

  var connectLess = require('connect-less');
  var sassMiddleware = require('node-sass-middleware');

  return function(connect, options, middlewares) {
    var sassSrc = grunt.config('angularToolbox.folder.src.sass');
    var tmpFolder = grunt.config('angularToolbox._.folder.tmp');
    var customMiddleware = grunt.config('angularToolbox.customMiddleware');

    [
      path.join(tmpFolder, grunt.config('angularToolbox.folder.demo')),
      path.join(tmpFolder, grunt.config('angularToolbox.folder.e2eSandbox')),
      path.join(tmpFolder, grunt.config('angularToolbox.folder.src.less'))
    ].forEach(function(folder) {
      del.sync(folder, {force: true});
      mkdirp(folder);
    });

    /* Handle style requests */
    middlewares.unshift(connectLess({
      dst: tmpFolder
    }));

    middlewares.unshift(sassMiddleware({
      src: path.resolve(sassSrc),
      outputStyle: 'expanded',
      dest: path.join(tmpFolder, 'src/sass'),
      prefix: '/src/sass'
    }));

    if (_.isArray(customMiddleware) || _.isFunction(customMiddleware)) {
      middlewares = [].concat(customMiddleware).concat(middlewares);
    }

    return middlewares;
  };
};
