'use strict';

/**
 * @ngdoc directive
 * @name rediditApp.directive:embed
 * @description
 * # embed
 */
angular.module('rediditApp')
  .directive('embed', function($sce) {
    return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe width="100%" height="100%" src="{{url}}" frameborder="0"></iframe>',
    link: function (scope,elem,attr) {
      if(attr.type=="video"){
        scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+attr.url+"?modestbranding=1&autohide=1&showinfo=0&controls=0");
      } else if(attr.type=="audio"){
        scope.url = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+attr.url+"&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true");
      } 
      // scope.$watch('code', function (newVal) {
      //    if (newVal) {
      //        scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+attr.videourl+"?modestbranding=1&autohide=1&showinfo=0&controls=0");
      //    }
      // });
    }
  };
});


