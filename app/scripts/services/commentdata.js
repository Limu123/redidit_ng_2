'use strict';

/**
 * @ngdoc service
 * @name rediditApp.commentdata
 * @description
 * # commentdata
 * Factory in the rediditApp.
 */
angular.module('rediditApp')
  .factory('Commentdata', ['$firebase', 'FIREBASE_URL', function ($firebase, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL + '/comments');
    var commentdata = $firebase(ref);    // all comments

    // Public API here
    var Comment = {

      all: function() {
        return commentdata.$asArray();
      },

      getCommentsForPost: function(post) {
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        var comments = $firebase(sync).$asArray();
        return comments;
      },

      createComment: function(comment, post){
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        var comments = $firebase(sync).$asArray();
        return comments.$add(comment);
      },

      deleteComment: function(comment, post){
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        var comments = $firebase(sync).$asArray();
        return comments.$remove(comment.$id);
      },

      deleteAllComments: function(post) {
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        sync.remove();
      },

      updateCommentVotes: function(comment, post){
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        var tempComment = $firebase(sync.child(comment.$id));
        return tempComment.$update({ votes : comment.votes });
      }
    };

    return Comment;
  }]);
