'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NewpostCtrl
 * @description
 * # NewpostCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('FormCtrl',function($scope){

  })
  .controller('NewpostCtrl', function ($scope, $log, $location, Postdata, Datefactory) {

    $scope.posts = Postdata.all;
    $scope.postType = 'video';     // initial postType
    $scope.field = {audiourl: '170045438', videourl: 'wAXJmUqlnUw'};




    $scope.setPosttype = function($event){
      $scope.postType = $event.target.value;
    };
    

    $scope.createPost = function() {

      $scope.post = {
        type: $scope.postType || 'link',
        title: $scope.title || 'demotitle',
        author: $scope.author || 'demoauthor',
        link: $scope.link || 'demolink',
        videourl: $scope.field.videourl || 'wAXJmUqlnUw', // oHg5SJYRHA0, wAXJmUqlnUw, sumn6flhNtg, 156900304, 170045438
        audiourl: $scope.field.audiourl || '170045438',
        views: 0,
        upvotes:0,
        time: Datefactory.getDate(),
        comments:[
          // {commentauthor: 'Peter', commenttext: 'Awesome Shit!', 'commentupvotes': 0},
           {commentauthor: 'Jane', commenttext: 'True!', 'commentupvotes': 0}
        ]
      };

      Postdata.createPost($scope.post);
      $location.path('/');

    };






  });
