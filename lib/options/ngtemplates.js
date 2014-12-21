var helpers = require('../helpers');

module.exports = {
  options: {
    htmlmin: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    module: helpers.getModuleName()
  },
  dist: {
    cwd: helpers.getFiles('src.partialsFolder'),
    src: '**/*.html',
    dest: helpers.getFiles('internal.ngTemplates')
  }
};
