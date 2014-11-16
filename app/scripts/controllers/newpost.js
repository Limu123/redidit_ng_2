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

    };


    

    // $scope.createPost = function() {

    //   $scope.post = {
    //     type: $scope.postType || 'link',
    //     title: $scope.title || 'demotitle',
    //     //author: $scope.author || 'demoauthor',
    //     author: $scope.user.profile.username || 'demoauthor',
    //     authorUID: $scope.user.uid || '0000',

    //     link: $scope.field.link || 'demolink',
    //     videourl: $scope.field.videourl || 'wAXJmUqlnUw', // oHg5SJYRHA0, wAXJmUqlnUw, sumn6flhNtg, 156900304, 170045438
    //     audiourl: $scope.field.audiourl || '170045438',
    //     text: $scope.field.text || 'demotext',
    //     image: $scope.field.image || 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg',

    //     views: 0,
    //     upvotes:0,
    //     time: Datefactory.getDate()
    //     // comments:[
    //     //   {commentauthor: 'Peter', commenttext: 'Awesome Shit!', 'commentupvotes': 0},
    //     //    {commentauthor: 'Jane', commenttext: 'True!', 'commentupvotes': 0}
    //     // ]
    //   };

    //   Postdata.createPost($scope.post);
    //   $location.path('/');


    // };






  });
