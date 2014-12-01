'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:NewpostCtrl
 * @description
 * # NewpostCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('NewpostCtrl', ['$scope','$log','$location', '$route', 'Postdata','Datefactory', 'Auth', function ($scope, $log, $location, $route, Postdata, Datefactory, Auth) {

    $scope.user = Auth.user;      // get post author
    $scope.postType = 'image';     // initial postType
    //$scope.field = {audiourl: '170045438', videourl: 'wAXJmUqlnUw', image: 'http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg' };
    $scope.field = {};
    $scope.url = '';
    $scope.text = '';

    if (!$scope.user.profile) {
      $location.path('/login');
    }

    $scope.posts = Postdata.all;

    $scope.setPosttype = function($event){
      $scope.postType = $event.target.value;
    };

    $scope.createPost = function() {

      var postModel;
      var pData = {
        title: $scope.title,
        description: $scope.description,
        author: $scope.user.profile.username,
        authorUID: $scope.user.uid,
        time: Datefactory.getDate()
      };

      switch ($scope.postType) {
        case 'text':
              //pData.url = $scope.url;
              pData.text = $scope.text;
              postModel = DataModel.createPostModelText(pData);
              break;

        case 'link':
              pData.url = $scope.url;
              postModel = DataModel.createPostModelLink(pData);
              break;

        case 'video':
              pData.url = $scope.url.split('watch?v=')[1];
              postModel = DataModel.createPostModelVideo(pData);
              break;

        case 'audio':
              pData.url = $scope.url.split('src="')[1].split('&amp;auto_play')[0];
              postModel = DataModel.createPostModelAudio(pData);
              break;

        case 'image':
              //pData.url = $scope.url;
              pData.url = $scope.url.split('://')[1];
              postModel = DataModel.createPostModelImage(pData);
              break;
      }

      $scope.post = postModel;
      Postdata.createPost($scope.post).then(function() {
        $route.reload();
        // update manually for isotope
      });

      $location.path('/');


    };
  }]);
