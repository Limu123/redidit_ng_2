'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('DetailCtrl', function ($scope, $location, $log, $routeParams, Postdata) {

    $scope.post = Postdata.getPost($routeParams.postId);


    $scope.showOverview = function(){
      $location.path('/');
    };

    $scope.createComment = function(){
      $scope.post.comment = {
        text: $scope.text,
        commentupvotes: 0
      };
      Postdata.createComment($scope.post.comment, $routeParams.postId);
    };

    $scope.deleteComment = function(comment){
      Postdata.deleteComment(comment, $routeParams.postId);
    };

    $scope.voteUpComment = function(comment, commentindex){
      comment.commentupvotes++;
      Postdata.updateCommentUpvotes($routeParams.postId, commentindex, comment.commentupvotes);
    };

    $scope.voteDownComment = function(comment, commentindex){
      comment.commentupvotes--;
      Postdata.updateCommentUpvotes($routeParams.postId, commentindex, comment.commentupvotes);
    };



    
  });
