'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('NavCtrl', function ($scope, $rootScope, $location, Auth) {

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;
    //$scope.logout = Auth.logout;
    
    $scope.loadPage = function(path){
      $location.path(path);
      //$rootScope.showNotification("primary");
    };

    $scope.logout = function(){
      Auth.logout();
      console.log("logout");
      //TODO SHOW NOTIFICATION
      $rootScope.showNotification("primary");
      //$rootScope.showNotification("primary");
      //$scope.$broadcast('notification', {type: 'primary', msg:'Logout'});
    }


    // $rootScope.showNotification = function(type) {
    //     console.log("SHOW NOTIFICATION");
    //    $scope.$broadcast('notification', {type: type, msg:'A notification'});
    // }


    
  });
