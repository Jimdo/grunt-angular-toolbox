/*!
 * grunt-angular-toolbox-sample v0.0.0
 * https://github.com/Jimdo/grunt-angular-toolbox/tree/master/sample_project
 *
 * sample project for grunt-angular-toolbox
 *
 * Copyright 2015, 
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/helper.module.js
  var myModule = angular.module('grunt-angular-toolbox-sample', []);

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

  // /Users/hannesdiercks/Sites/grunt-angular-toolbox/.tmp/ng_templates.js
  angular.module('grunt-angular-toolbox-sample').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('directive.html',
      "<div><h1>My Directive</h1><h2>{{foo}}</h2></div>"
    );

  }]);
})(window.angular);
