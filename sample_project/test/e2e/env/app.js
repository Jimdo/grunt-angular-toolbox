(function(angular) {
  angular.module('e2eApp', ['gruntAngularToolboxSample']).run(function(untested) {
    untested.thisIsNotTestedInUnit('lorem');
  });
})(window.angular);
