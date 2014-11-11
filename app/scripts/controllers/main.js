'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('MainCtrl', ['$scope', '$log', '$location','Postdata','Commentdata', 'Auth', 'Userprofile', function ($scope, $log, $location, Postdata, Commentdata, Auth, Userprofile) {

        _init();

        function _init() {
          $scope.posts = Postdata.all();
          $scope.posts.$loaded().then(function (p) {
            _addCommentCounts(p);
            _addPostVotes(p);
          });
        }

        $scope.user = Auth.user;
        $scope.signedIn = Auth.signedIn;
        //$scope.postType = 'video';     // initial postType

        $scope.deletePost = function(post){

          //$scope.$emit('iso-method', {name:null, params:null})
          //scope.refreshIso();
          //isotope();

          Commentdata.deleteAllComments(post);
          Postdata.deletePost(post);
          //Userprofile.deletePost(post); // TODO
        };

        $scope.showDetail = function(post){
          post.views++;
          Postdata.updateViews(post);

          $location.path('/detail/'+post.$id);
        };

        $scope.voteUp = function(post){
          var postVoteModel;

          var currentVote = $scope.getVote(post);
          if (currentVote === 1) {
            return;
          }

          var vData = {
            postId: post.$id,
            authorUID: $scope.user.uid,
            vote: 1
          };

          postVoteModel = DataModel.createPostVoteModel(vData);
          Postdata.updateVotes(post, postVoteModel);
        };

        $scope.voteDown = function(post){
          var postVoteModel;

          var currentVote = $scope.getVote(post);
          if (currentVote === -1) {
            return;
          }

          var vData = {
            postId: post.$id,
            authorUID: $scope.user.uid,
            vote: -1
          };

          postVoteModel = DataModel.createPostVoteModel(vData);
          Postdata.updateVotes(post, postVoteModel);
        };

        $scope.getVote = function(post){
          var vValue = 0;
          if (post.votesList) {
            post.votesList.forEach(function(v) {
              if (v.authorUID === $scope.user.uid) {
                vValue = v.vote;
                return false;
              }
            })
          }
          return vValue;
        };

        function _addCommentCounts (elements) {
          elements.forEach(function(element) {
            Commentdata.getCommentsForPost(element).$loaded().then(function(c) {
                element.CommentCount = c.length;
              });
          });
        }

        function _addPostVotes (postElements) {
          postElements.forEach(function(element) {
            Postdata.getVotesForPost(element).$loaded().then(function(v) {
              element.votes = v.length;
              element.votesList = v || {};
            })
          })
        }
  }]);
