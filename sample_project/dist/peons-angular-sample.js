/*!
 * peons-angular-sample v
 * https://github.com/Jimdo/peons-angular/tree/master/sample_project
 *
 * sample project for peons-angular
 *
 * Copyright 2014, 
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/helper.module.js
  var myModule = angular.module('peons-angular-sample', []);

  // src/js/directive.directive.js
  myModule.directive('myDirective', function() {
    return {
      templateUrl: 'directive.html',
      controller: ['$scope', function($scope) {
        $scope.foo = 'bar';
      }]
    };
  });

  // src/js/service.unused.js
  myModule.factory('untested', function() {
    return {
      thisIsNotTestedInE2e: function(foo) {
        return foo;
      },
      thisIsNotTestedInUnit: function(bar) {
        return bar;
      }
    };
  });

  // /Users/hannesdiercks/Sites/peons-angular/.tmp/ng_templates.js
  angular.module('peons-angular-sample').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('directive.html',
      "<div><h1>My Directive</h1><h2>{{foo}}</h2></div>"
    );

  }]);
})(window.angular);
