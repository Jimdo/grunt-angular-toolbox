angular.module('e2eApp', ['grunt-angular-toolbox-sample']).run(function(untested) {
  untested.thisIsNotTestedInUnit('lorem');
});
