'use strict';

/**
 * @ngdoc directive
 * @name rediditApp.directive:youtube
 * @description
 * # youtube
 */
angular.module('rediditApp')
  .directive('youtube', function($sce) {
    return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe width="100%" height="100%" src="{{url}}" frameborder="0"></iframe>',
    link: function (scope,elem,attr) {
      scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+attr.videourl+"?modestbranding=1&autohide=1&showinfo=0&controls=0");
      // scope.$watch('code', function (newVal) {
      //    if (newVal) {
      //        scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+attr.videourl+"?modestbranding=1&autohide=1&showinfo=0&controls=0");
      //    }
      // });
    }
  };


});



