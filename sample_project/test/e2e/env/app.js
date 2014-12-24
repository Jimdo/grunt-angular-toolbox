angular.module('e2eApp', ['peons-angular-sample']).run(function(untested) {
  untested.thisIsNotTestedInUnit('lorem');
});
