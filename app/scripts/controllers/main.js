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

    //$scope.$emit('iso-method', {name:'destroy', params:null});
    //$route.reload();
    




    $scope.deletePost = function(post){
      //$scope.$emit('iso-method', {name:null, params:null})
      //scope.refreshIso();
      //isotope();
      Postdata.deletePost(post).then(function(){
        //$scope.$apply();
        //$location.path('/detail/-JatGQGv3xw-pMY7sgWm');
        //$location.path('/');
        //console.log(post);
        //$window.location.reload();   
      });
      Userprofile.deletePost(post); // TODO

      //$scope.$emit('iso-method', {name:'shuffle', params:null})
      //$scope.$emit('reloadItems'); 
      //console.log("update isotope");
      //$scope.$emit('iso-method', {name:'reloadItems'});
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
      //console.log(post.authorUID);
      $location.path('/user/'+post.authorUID);
    };


    // $scope.$watch($scope.posts, function() {
    //    console.log('hey, myVar has changed!');
    //    $scope.$emit('iso-method', {name:'reloadItems', params:null}); 
    // });



  });
