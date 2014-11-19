'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:AuthctrlCtrl
 * @description
 * # AuthctrlCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('AuthCtrl', function ($scope, $rootScope, $location, Auth, user) {



    // if user is logged in, redirect to homepage
    if (user) {
      $location.path('/');
    }
    // if (Auth.signedIn()) {
    //   $location.path('/');
    // }


    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        $location.path('/',function(){
          console.log("test");
        });


        //TODO SHOW NOTIFICATION
        $rootScope.showNotification("primary");


      }, function(error){
        $scope.error = error.toString();
      });
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function(user) {
        return Auth.login($scope.user).then(function() {
          user.username = $scope.user.username;
          //user.gender = $scope.gender;
          user.description = $scope.user.description;
          user.email = $scope.user.email;
          return Auth.createProfile(user);
        }).then(function() {
          $location.path('/');


          //TODO SHOW NOTIFICATION
          $rootScope.showNotification("primary");


        });
      }, function(error) {
        $scope.error = error.toString();
      });
    };



  });









