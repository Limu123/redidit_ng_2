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

    var ref = new Firebase(FIREBASE_URL);
    var commentdata = $firebase(ref.child('comments'));    // all comments

    // Public API here
    var Comment = {

      all: function() {
        var comments = commentdata.$asArray();
        _getRelatedData(comments);
        return comments;
      },

      getCommentsForPost: function(post) {
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        var comments = $firebase(sync).$asArray();
        _getRelatedData(comments);
        return comments;
      },

      createComment: function(comment, post){
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
        var comments = $firebase(sync).$asArray();
        return comments.$add(comment);
      },

      deleteComment: function(comment, post){
        Comment.deleteAllVotes(comment);
        var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/' + comment.$id + '/');
        sync.remove();
      },

      deleteAllComments: function(post) {
        var comments = Comment.getCommentsForPost(post);
        comments.$loaded().then(function(cList) {
          cList.forEach(function(c) {
            Comment.deleteAllVotes(c);

            var sync = new Firebase(FIREBASE_URL + '/comments/' + post.$id + '/');
            sync.remove();
          });
        });
      },

      deleteAllVotes: function(comment) {
        var sync = new Firebase(FIREBASE_URL + '/commentvotes/' + comment.$id + '/');
        sync.remove();
      },

      getVotesForComment: function (comment) {
        var sync = new Firebase(FIREBASE_URL + '/commentvotes/' + comment.$id + '/');
        var commentVotes = $firebase(sync).$asArray();
        return commentVotes;
      },

      updateCommentVotes: function (comment, voteData) {
        var currentVote;

        var sync = new Firebase(FIREBASE_URL + '/commentvotes/' + voteData.commentId + '/');
        var commentVotes = $firebase(sync).$asArray();

        commentVotes.$loaded().then(function (cList) {

          //Is there another way to get directly the dataset with the users authorUID?
          currentVote = cList.filter(function (v) {
            return v.authorUID === voteData.authorUID;
          });

          if (currentVote && currentVote[0]) {
            var index = cList.indexOf(currentVote[0]);

            if (cList[index].vote === voteData.vote) {
              cList.$remove(index);
            }
            else {
              cList[index].vote = voteData.vote;
              cList.$save(index);
            }
          }
          else {
            cList.$add(voteData);
          }

          _getCommentVotes([comment]);
        });
      },

      getVoteForCurrentUser: function (comment, user) {
        var vValue = 0;

        if (comment.votesList) {
          comment.votesList.forEach(function (v) {
            if (v.authorUID === user.uid) {
              vValue = v.vote;
              return false;
            }
          })
        }
        return vValue;
      },

      getStyleForVoteUpComment: function (comment, user)  {
        var currentVote = Comment.getVoteForCurrentUser(comment, user);
        var style;

        switch (currentVote) {
          case 1:
            style = "icon icon-voteup-selected";
            break;

          default:
            style = "icon icon-voteup";
            break;
        }

        return style;
      },

      getStyleForVoteDownComment: function(comment, user) {
        var currentVote = Comment.getVoteForCurrentUser(comment, user);
        var style;

        switch (currentVote) {
          case -1:
            style = "icon icon-votedown-selected";
            break;

          default:
            style = "icon icon-votedown";
            break;
        }

        return style;
      }

    };

    function _getRelatedData(data) {
      data.$loaded().then(function (d) {
        _getCommentVotes(d);
      });
    }

    function _getCommentVotes (comments) {
      comments.forEach(function(comment) {
        Comment.getVotesForComment(comment).$loaded().then(function(v) {
          var vSum = 0;
          v.forEach(function(vote) {
            vSum += vote.vote;
          });
          comment.votes = vSum;
          comment.votesList = v || {};
        })
      })
    }

    return Comment;
  }]);
