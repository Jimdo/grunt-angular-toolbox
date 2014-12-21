
module.exports = {
  demo: ['watch:partials', 'watch:demo', 'shell:openDemo'],
  demoE2e: ['shell:openDemoE2e', 'connect:test:keepalive'],
  options: {
    logConcurrentOutput: true
  }
};
