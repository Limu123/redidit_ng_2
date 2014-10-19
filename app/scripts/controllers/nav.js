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


    $scope.submitPost = function () {
      $scope.post.creator = $scope.user.profile.username;
      $scope.post.creatorUID = $scope.user.uid;
      Post.create($scope.post).then(function (ref) {
        $location.path('/posts/' + ref.name());
        $scope.post = {url: 'http://', title: ''};
      });
    };



    
  });
