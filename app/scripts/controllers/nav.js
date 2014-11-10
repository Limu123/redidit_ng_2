'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('NavCtrl', function ($scope, $location, Auth) {

    $scope.user = Auth.user;

    $scope.signedIn = Auth.signedIn;
    $scope.logout = Auth.logout;
    
    $scope.loadPage = function(path){
      $location.path(path);
    };

    
  });
