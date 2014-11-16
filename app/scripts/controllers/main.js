'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('MainCtrl', ['$scope', '$log', '$location','Postdata','Commentdata', 'Auth', 'Userprofile', function ($scope, $log, $location, Postdata, Commentdata, Auth, Userprofile) {

    $scope.posts = Postdata.all();

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.getStyleForVoteUpPost = function(post)  {
      return Postdata.getStyleForVoteUpPost(post, $scope.user);
    };

    $scope.getStyleForVoteDownPost = function(post) {
      return Postdata.getStyleForVoteDownPost(post, $scope.user);
    };

    $scope.deletePost = function(post){

      //$scope.$emit('iso-method', {name:null, params:null})
      //scope.refreshIso();
      //isotope();

      Postdata.deletePost(post);
    };

    $scope.isOwn = function(post) {
      return post.authorUID === Auth.user.uid;
    }

    $scope.showDetail = function(post){
      post.views++;
      Postdata.updateViews(post);

      $location.path('/detail/'+post.$id);
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
  }]);
