'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$route', '$timeout', 'Postdata','Commentdata', 'Auth', function ($scope, $rootScope, $location, $route, $timeout, Postdata, Commentdata, Auth) {

    $scope.posts = Postdata.all();

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $timeout(function(){
      $scope.posts.$watch(function(){
        refreshIsotope();
      });
    },5000);

    function refreshIsotope(){
      $timeout(function(){
        $scope.refreshIso();
        $scope.$emit('iso-method', {name:'insert', params:null});
      },1000);
    }

    $scope.deletePost = function(post){
      Postdata.deletePost(post);
      refreshIsotope();
    };

    $scope.showDetail = function(post){
      post.views++;
      Postdata.updateViews(post);

      $location.path('/detail/'+post.$id);
    };

    $rootScope.getStyleForVoteUpPost = function(post)  {
      return Postdata.getStyleForVoteUpPost(post, $scope.user);
    };

    $rootScope.getStyleForVoteDownPost = function(post) {
      return Postdata.getStyleForVoteDownPost(post, $scope.user);
    };

    $rootScope.isOwn = function(post) {
      return post.authorUID === Auth.user.uid;
    };

    $rootScope.voteUpPost = function(post){
      var postVoteModel;

      var vData = {
        postId: post.$id,
        authorUID: $scope.user.uid,
        vote: 1
      };

      postVoteModel = DataModel.createPostVoteModel(vData);
      Postdata.updateVotes(post, postVoteModel);
    };

    $rootScope.voteDownPost = function(post){
      var postVoteModel;

      var vData = {
        postId: post.$id,
        authorUID: $scope.user.uid,
        vote: -1
      };

      postVoteModel = DataModel.createPostVoteModel(vData);
      Postdata.updateVotes(post, postVoteModel);
    };

    $rootScope.getauthorprofile = function(post){
      $location.path('/user/'+post.authorUID);
    };
  }]);
