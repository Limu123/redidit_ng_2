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
    $scope.signedIn = Auth.signedIn;

    $scope.post = Postdata.getPost($routeParams.postId);
    $scope.comments = Commentdata.getCommentsForPost($scope.post);

    $scope.commentText;


    $scope.showOverview = function(){
      $location.path('/');
    };

    $scope.getStyleForVoteUpPost = function(post)  {
      return Postdata.getStyleForVoteUpPost(post, $scope.user);
    };

    $scope.getStyleForVoteDownPost = function(post) {
      return Postdata.getStyleForVoteDownPost(post, $scope.user);
    };

    $scope.getStyleForVoteUpComment = function(comment) {
      return Commentdata.getStyleForVoteUpComment(comment, $scope.user);
    };

    $scope.getStyleForVoteDownComment = function(comment) {
      return Commentdata.getStyleForVoteDownComment(comment, $scope.user);
    };

    $scope.voteUpPost = function(post){
      var postVoteModel;

      var vData = {
        postId: post.$id,
        authorUID: $scope.user.uid,
        vote: 1
      };

      postVoteModel = DataModel.createPostVoteModel(vData);
      Postdata.updateVotes(post, postVoteModel);
    };

    $scope.voteDownPost = function(post){
      var postVoteModel;

      var vData = {
        postId: post.$id,
        authorUID: $scope.user.uid,
        vote: -1
      };

      postVoteModel = DataModel.createPostVoteModel(vData);
      Postdata.updateVotes(post, postVoteModel);
    };

    $scope.isOwn = function(data) {
      return data.authorUID === Auth.user.uid;
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
      Commentdata.createComment(commentModel, $scope.post);
      $scope.commentText = '';
    };

    $scope.deleteComment = function(comment){
      Commentdata.deleteComment(comment, $scope.post);
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

  }]);
