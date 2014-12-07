'use strict';

/**
 * @ngdoc directive
 * @name rediditApp.directive:picture
 * @description
 * # picture
 */
angular.module('rediditApp')
  .directive('picture', function($sce) {
    return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<img ng-src="{{url}}">',
    link: function (scope,elem,attr) {
      scope.url = $sce.trustAsResourceUrl("http://"+attr.url); // https?
    }
  };
});
