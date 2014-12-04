'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('UserCtrl', ['$scope', '$route', '$routeParams', 'Userprofile', 'Postdata', 'Commentdata', 'Auth', function ($scope, $route, $routeParams, Userprofile, Postdata, Commentdata, Auth)  {

    var uid = $routeParams.userId;


    $scope.profile = Userprofile.getUser(uid);
    $scope.posts = Postdata.all();

    Auth.resolveUser().then(function(){
      $scope.currentUser = Auth.user.uid;
    });

    $scope.postCount = 0;

    $scope.posts.$loaded().then(function(pList) {
      var filteredData = pList.filter(function (p) {
        return p.authorUID === uid;
      });

      //$scope.posts = jQuery.grep($scope.posts, function(a) {
      //  return filteredData.indexOf(a) !== -1;
      //});

      $scope.posts = filteredData;
      $scope.postCount = $scope.posts.length;
    });

    $scope.hasNoPosts = function() {
      return $scope.postCount === 0;
    };

    $scope.deletePost = function(post) {
      Postdata.deletePost(post).then(function () {
        $route.reload();
      });
    }
  }]);
