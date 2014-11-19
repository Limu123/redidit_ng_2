'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NewpostCtrl
 * @description
 * # NewpostCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  // .controller('FormCtrl',function($scope){

  // })
  .controller('NewpostCtrl', function ($scope, $log, $location, Postdata, Datefactory, Auth) {

    $scope.posts = Postdata.all;
    $scope.user = Auth.user;      // get post author
    $scope.postType = 'link';     // initial postType
    $scope.field = { content:'' };  // required for ng-switch

    

    $scope.setPosttype = function($event){
      $scope.postType = $event.target.value;
    };


    $scope.createPost = function() {

      var postContent = $scope.field.content || 'content';

      if($scope.postType=='audio'){
        postContent = $scope.field.content.split('src="')[1].split('&amp;auto_play')[0];
      } else if ($scope.postType=='video'){
        postContent = $scope.field.content.split('watch?v=')[1];
      }

      $scope.post = {
        type: $scope.postType || 'link',
        title: $scope.title || 'demotitle',
        author: $scope.user.profile.username || 'demoauthor',
        authorUID: $scope.user.uid || '0000',
        content: postContent,
        description: $scope.description || 'description',
        views: 0,
        upvotes:0,
        comments:0,
        time: Datefactory.getDate()
      };

      Postdata.createPost($scope.post);
      $location.path('/');


      //$scope.$emit('iso-method', {name:'reloadItems', params:null}); 


    };








  });
