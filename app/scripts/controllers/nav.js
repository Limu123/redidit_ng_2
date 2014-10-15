'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('NavCtrl', function ($scope, $location) {
    
    $scope.loadPage = function(path){
      $location.path(path);
    };
    
  });
