'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NewpostCtrl
 * @description
 * # NewpostCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('NewpostCtrl', ['$scope','$log','$location','Postdata','Datefactory', 'Auth', function ($scope, $log, $location, Postdata, Datefactory, Auth) {

    $scope.posts = Postdata.all;
    $scope.user = Auth.user;      // get post author
    $scope.postType = 'link';     // initial postType
    //$scope.field = {audiourl: '170045438', videourl: 'wAXJmUqlnUw', image: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg' };
    $scope.field = {};
    $scope.url = '';
    $scope.text = '';

    $scope.setPosttype = function($event){
      $scope.postType = $event.target.value;
    };

    $scope.createPost = function() {

      var postModel;
      var pData = {
        title: $scope.title,
        url: $scope.url,
        description: $scope.description,
        author: $scope.user.profile.username,
        authorUID: $scope.user.uid,
        time: Datefactory.getDate()
      };

      switch ($scope.postType) {
        case 'text':
              pData.text = $scope.text;
              postModel = DataModel.createPostModelText(pData);
              break;

        case 'link':
              postModel = DataModel.createPostModelLink(pData);
              break;

        case 'video':
              postModel = DataModel.createPostModelVideo(pData);
              break;

        case 'audio':
              postModel = DataModel.createPostModelAudio(pData);
              break;

        case 'image':
              postModel = DataModel.createPostModelImage(pData);
              break;
      };

      console.log(postModel);

/*
      $scope.post = {
        type: $scope.postType || 'link',
        title: $scope.title || 'demotitle',
        author: $scope.user.profile.username || 'demoauthor',

        link: $scope.field.link || 'demolink',
        videourl: $scope.field.videourl || 'wAXJmUqlnUw', // oHg5SJYRHA0, wAXJmUqlnUw, sumn6flhNtg, 156900304, 170045438
        audiourl: $scope.field.audiourl || '170045438',
        text: $scope.field.text || 'demotext',
        image: $scope.field.image || 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg',

        views: 0,
        upvotes:0,
        time: Datefactory.getDate(),
        comments:[
          // {commentauthor: 'Peter', commenttext: 'Awesome Shit!', 'commentupvotes': 0},
           {commentauthor: 'Jane', commenttext: 'True!', 'commentupvotes': 0}
        ]
      };

      //Postdata.createPost($scope.post);
*/
      $scope.post = postModel;
      Postdata.createPost($scope.post);

      $location.path('/');
    };
  }]);
