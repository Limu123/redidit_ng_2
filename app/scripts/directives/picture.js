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
    // template: '<img src="{{url}}">',
    template: '<img src="http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg">',
    link: function (scope,elem,attr) {
      scope.url = $sce.trustAsResourceUrl(attr.url);
    }
  };
});

