'use strict';

/**
 * @ngdoc directive
 * @name rediditApp.directive:notification
 * @description
 * # notification
 */
angular.module('rediditApp')
  .directive('notification', ['$compile', function ($compile) { 

    var classes = {
      primary : 'bg-primary',
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      danger: 'bg-danger'
    };

    return {
      restrict: 'AE',
      template: '',
      replace: true,
      link:function (scope, elm, attr) {        

        scope.boot_class = classes.primary;

        var isDef = angular.isDefined;

        scope.$on('notification', function(event, o) {

          if (!isDef(o) || !isDef(o.type) || !isDef(classes[o.type]))
            return;
          var type = o.type;
          scope.boot_class = classes[type];
          scope.msg = o.msg;

          elm.html(template);
          $compile(elm.contents())(scope);

        });

        var template = 
        '<div id="message" class="notification" class="animation">{{msg}}</div>';
        
      
      }
    };
  }]);




