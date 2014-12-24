
module.exports = {
  demo: ['watch:partials', 'watch:demo', 'shell:openDemo'],
  tdde2e: ['watch:andTestE2e', 'protractor_coverage:watch:start'],
  demoE2e: ['shell:openDemoE2e', 'connect:test:keepalive'],
  options: {
    logConcurrentOutput: true
  }
};
