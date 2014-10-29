'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:AuthctrlCtrl
 * @description
 * # AuthctrlCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('AuthCtrl', function ($scope, $location, Auth, user) {

    $scope.gender = 'female';

    // if user is logged in, redirect to homepage
    if (user) {
      $location.path('/');
    }
    // if (Auth.signedIn()) {
    //   $location.path('/');
    // }

    $scope.setGender = function($event){
      $scope.gender = $event.target.value;
    };

    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        $location.path('/');
      }, function(error){
        $scope.error = error.toString();
      });
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function(user) {
        return Auth.login($scope.user).then(function() {
          user.username = $scope.user.username;
          user.gender = $scope.gender;
          user.description = $scope.user.description
          return Auth.createProfile(user);
        }).then(function() {
          $location.path('/');
        });
      }, function(error) {
        $scope.error = error.toString();
      });
    };

    // $scope.register = function () {
    //   Auth.register($scope.user).then(function() {
    //     return Auth.login($scope.user).then(function() {
    //       $location.path('/');
    //     }, function(error){
    //       $scope.error = error.toString();
    //     });
    //   });
    // };

  });









