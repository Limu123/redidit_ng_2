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
    scope: { pcode:'=' },
    replace: true,
    template: '<img src="{{url}}"/>',
    link: function (scope,elem,attr) {
      scope.url = $sce.trustAsResourceUrl(attr.url);
    }
  };
});
