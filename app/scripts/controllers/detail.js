'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('DetailCtrl', ['$scope','$location','$log','$routeParams', 'Postdata', 'Commentdata', 'Auth', function ($scope, $location, $log, $routeParams, Postdata, Commentdata, Auth) {

    $scope.user = Auth.user;
    $scope.post = Postdata.getPost($routeParams.postId);
    //$scope.comments = Postdata.comments($routeParams.postId).$asArray();

    $scope.commentText;
    $scope.comments = Commentdata.getCommentsForPost($scope.post);

    $scope.showOverview = function(){
      $location.path('/');
    };

    $scope.voteUp = function(post){
      post.votes++;
      Postdata.updateVotes(post);
    };

    $scope.voteDown = function(post){
      post.votes--;
      Postdata.updateVotes(post);
    };

    $scope.createComment = function(){

      var commentModel;
      var pData = {
        postId: $routeParams.postId,
        commentText: $scope.commentText,
	      author: $scope.user.profile.username,
        authorUID: $scope.user.uid
      };

      commentModel = DataModel.createCommentModel(pData);
      Commentdata.createComment(commentModel, $scope.post);
      $scope.commentText = '';
    };

    $scope.deleteComment = function(comment){
      Postdata.deleteComment(comment, $routeParams.postId);
    };

    $scope.voteUpComment = function(comment){
      comment.votes++;
      Commentdata.updateCommentVotes(comment, $scope.post);
    };

    $scope.voteDownComment = function(comment){
      comment.votes--;
      Commentdata.updateCommentVotes(comment, $scope.post);
    };

  }]);
