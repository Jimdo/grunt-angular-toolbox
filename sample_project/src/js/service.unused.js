/* global myModule */
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
