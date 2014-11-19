'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('MainCtrl', function ($scope, $rootScope, $log, $location, $routeParams, $window,  Postdata, Auth, Userprofile) {



    $scope.posts = Postdata.all;
    $scope.user = Auth.user;
    $scope.postType = 'video';     // initial postType



    // $scope.$on('notification', function(event,data){
    //   console.log(data);
    // });


    $scope.deletePost = function(post){
      Postdata.deletePost(post);
      Userprofile.deletePost(post); // TODO
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

    $rootScope.getauthorprofile = function(post){
      $location.path('/user/'+post.authorUID);
    };




  });
