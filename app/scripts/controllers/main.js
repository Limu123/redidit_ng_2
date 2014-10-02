'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('MainCtrl', function ($scope, $log, $location, Postdata) {


    $scope.posts = Postdata.all;
    $scope.postType = 'video';     // initial postType



    $scope.deletePost = function(post){
      Postdata.deletePost(post);
    };

    $scope.showDetail = function(post){
      //$log.debug('/detail/'+post.$id);
      post.views++;
      Postdata.updateViews(post.$id, post.views);
      $location.path('/detail/'+post.$id);
    };

    $scope.voteUp = function(post){
      post.upvotes++;
      Postdata.updateUpvotes(post.$id, post.upvotes);
    };

    $scope.voteDown = function(post){
      post.upvotes--;
      Postdata.updateUpvotes(post.$id, post.upvotes);
    };



  });
