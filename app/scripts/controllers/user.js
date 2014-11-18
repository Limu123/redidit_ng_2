'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('UserCtrl', ['$scope', '$routeParams', 'Userprofile', 'Postdata', 'Commentdata', function ($scope, $routeParams, Userprofile, Postdata, Commentdata)  {

    var uid = $routeParams.userId;

    $scope.posts = Postdata.getPostsForUser(uid);
    $scope.profile = Userprofile.getUser(uid);

    $scope.hasNoPosts = function() {
      return $scope.posts.length === 0;
    };

    $scope.deletePost = function(post) {
      Postdata.deletePost(post);
    }
  }]);
