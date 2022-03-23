var port = process.env.E2E_SANDBOX_PORT || 8765;
var sandboxUrl = 'http://localhost:' + port + '/';

beforeEach(function() {
  browser.waitForAngularEnabled(false);
  browser.get(sandboxUrl);
});

module.exports = {
  help: function(i) {
    i = i || 0;
    return i < 1 ? '... I need somebody.' : 'not just anybody!';
  }
};
