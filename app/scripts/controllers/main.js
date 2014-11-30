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
        console.log("reload");
        $scope.$apply();
        $route.reload();
        //$scope.$digest();
      });
    },10000);


    $rootScope.getStyleForVoteUpPost = function(post)  {
      return Postdata.getStyleForVoteUpPost(post, $scope.user);
    };

    $rootScope.getStyleForVoteDownPost = function(post) {
      return Postdata.getStyleForVoteDownPost(post, $scope.user);
    };

    $scope.deletePost = function(post){

      //$scope.$emit('iso-method', {name:null, params:null})
      //scope.refreshIso();
      //isotope();

      Postdata.deletePost(post).then(function () {
        //$route.reload();
        console.log("delete");
      });
    };

    $rootScope.isOwn = function(post) {
      return post.authorUID === Auth.user.uid;
    };

    $scope.showDetail = function(post){
      post.views++;
      Postdata.updateViews(post);

      $location.path('/detail/'+post.$id);
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
      //console.log(post.authorUID);
      $location.path('/user/'+post.authorUID);
    };
  }]);
