module.exports = {
  cleanupModules: ['factory', require('./cleanupModules')],
  connectMiddleware: ['factory', require('./connectMiddleware')],
  injectorTransform: ['factory', require('./injectorTransform')],
  normalizeCoverage: ['factory', require('./normalizeCoverage')]
};
