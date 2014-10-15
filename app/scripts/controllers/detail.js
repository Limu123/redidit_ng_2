'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('DetailCtrl', ['$scope','$location','$log','$routeParams', 'Postdata', function ($scope, $location, $log, $routeParams, Postdata) {

    $scope.post = Postdata.getPost($routeParams.postId);
    $scope.comments = Postdata.comments($routeParams.postId).$asArray();


    $scope.showOverview = function(){
      $location.path('/');
    };

    $scope.createComment = function(){
      $scope.comment = {
        text: $scope.comment.text,
        commentupvotes: 0
      };
      Postdata.createComment($scope.comment, $routeParams.postId);
    };

    $scope.deleteComment = function(comment){
      Postdata.deleteComment(comment, $routeParams.postId);
    };

    $scope.voteUpComment = function(comment){
      comment.commentupvotes++;
      Postdata.updateCommentUpvotes(comment, $routeParams.postId, comment.commentupvotes);
    };

    $scope.voteDownComment = function(comment){
      comment.commentupvotes--;
      Postdata.updateCommentUpvotes(comment, $routeParams.postId, comment.commentupvotes);
    };

  }]);
