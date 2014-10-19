'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('DetailCtrl', function ($scope, $location, $log, $routeParams, Postdata, Auth) {

    $scope.user = Auth.user;
    $scope.post = Postdata.getPost($routeParams.postId);
    $scope.comments = Postdata.comments($routeParams.postId).$asArray();




    $scope.showOverview = function(){
      $location.path('/');
    };

    $scope.createComment = function(){
      $scope.comment = {
        commentauthor: $scope.user.profile.username,
        text: $scope.comment.text,
        commentupvotes: 0,
        commentauthorUID: $scope.user.uid
      };
      Postdata.createComment($scope.comment, $routeParams.postId);
    };

    $scope.deleteComment = function(comment){
      Postdata.deleteComment(comment, $routeParams.postId);
    };

    $scope.voteUpComment = function(comment){
      comment.commentupvotes++;
      Postdata.updateCommentUpvotes(comment, $routeParams.postId, comment.commentupvotes);
    };

    $scope.voteDownComment = function(comment){
      comment.commentupvotes--;
      Postdata.updateCommentUpvotes(comment, $routeParams.postId, comment.commentupvotes);
    };



    
  });
