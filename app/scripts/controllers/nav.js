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
    
    $scope.loadPage = function(path){
      $location.path(path);
    };

    $scope.logout = function(){
      Auth.logout();
      console.log("logout");
      // Notification
      $rootScope.$broadcast('notification', {type: "primary", msg:'Logged out'});
    }
    
  });
