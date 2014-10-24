'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('UserCtrl', function ($scope, $routeParams, Userprofile)  {
    var uid = $routeParams.userId;

    $scope.profile = Userprofile.get(uid);
    Userprofile.getPosts(uid).then(function(posts) {
      $scope.posts = posts;
    });

    //Userprofile.getPosts(uid);


    // TODO show all userposts on profile-page


  });
