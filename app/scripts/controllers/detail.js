'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('DetailCtrl', ['$scope', '$rootScope', '$location','$log','$routeParams', 'Postdata', 'Commentdata', 'Auth', function ($scope, $rootScope, $location, $log, $routeParams, Postdata, Commentdata, Auth) {

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.post = Postdata.getPost($routeParams.postId);
    $scope.comments = Commentdata.getCommentsForPost($scope.post);

    $scope.commentText;


    $scope.showOverview = function(){
      $location.path('/');
    };

    $scope.getStyleForVoteUpComment = function(comment) {
      return Commentdata.getStyleForVoteUpComment(comment, $scope.user);
    };

    $scope.getStyleForVoteDownComment = function(comment) {
      return Commentdata.getStyleForVoteDownComment(comment, $scope.user);
    };

    $scope.createComment = function(){

      var commentModel;
      var cData = {
        postId: $routeParams.postId,
        commentText: $scope.commentText,
	      author: $scope.user.profile.username,
        authorUID: $scope.user.uid
      };

      commentModel = DataModel.createCommentModel(cData);
      Commentdata.createComment(commentModel, $scope.post).then(function(c) {
        Postdata.updateComments($scope.post);
      });
      $scope.commentText = '';
    };

    $scope.deleteComment = function(comment){
      Commentdata.deleteComment(comment, $scope.post);
      Postdata.updateComments($scope.post);
    };

    $scope.voteUpComment = function(comment){
      var commentVoteModel;

      var vData = {
        postId: $scope.post.$id,
        commentId: comment.$id,
        authorUID: $scope.user.uid,
        vote: 1
      };

      commentVoteModel = DataModel.createCommentVoteModel(vData);
      Commentdata.updateCommentVotes(comment, commentVoteModel);
    };

    $scope.voteDownComment = function(comment){
      var commentVoteModel;

      var vData = {
        postId: $scope.post.$id,
        commentId: comment.$id,
        authorUID: $scope.user.uid,
        vote: -1
      };

      commentVoteModel = DataModel.createCommentVoteModel(vData);
      Commentdata.updateCommentVotes(comment, commentVoteModel);
    };

    $scope.getcommentauthorprofile = function(comment){
      //console.log(comment.authorUID);
      $location.path('/user/'+comment.authorUID);
    };

  }]);
