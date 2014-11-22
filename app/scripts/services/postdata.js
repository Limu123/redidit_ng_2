'use strict';

/**
 * @ngdoc service
 * @name rediditApp.postdata
 * @description
 * # postdata
 * Factory in the rediditApp.
 */
angular.module('rediditApp')
  .factory('Postdata', ['$firebase', 'FIREBASE_URL', 'Commentdata', function ($firebase, FIREBASE_URL, Commentdata) {

    var ref = new Firebase(FIREBASE_URL + '/posts/');

    var postdata = $firebase(ref);

    var Post = {

      all: function () {
        var data = postdata.$asArray();

        data.$loaded().then(function(d) {
          _getRelatedData(d);
        });

        return data;
      },

      find: function (postId) {
        return $firebase(ref.child(postId)).$asObject();
      },

      getPost: function (postId) {
        var post = $firebase(ref.child(postId)).$asObject();
        _getRelatedData([post]);
        return post;
      },

      //getPostsForUser: function(userId) {
      //  var data = postdata.$asArray();
      //
      //  data.$loaded().then(function(d) {
      //    var filteredData = d.filter(function (p) {
      //      return p.authorUID === userId;
      //    });
      //    _getRelatedData(filteredData);
      //
      //    data = jQuery.grep(data, function(a) {
      //      return filteredData.indexOf(a) !== -1;
      //    });
      //  });
      //
      //  return data;
      //},

      createPost: function (post) {
        //return postdata.$add(post).then(function(postRef){
        //    $route.reload();
        //  });
        return postdata.$asArray().$add(post);
      },

      deletePost: function (post) {
        Post.deleteAllVotes(post);
        Commentdata.deleteAllComments(post);
        return postdata.$asArray().$remove(post);
      },


      deleteAllVotes: function(post) {
        var sync = new Firebase(FIREBASE_URL + '/postvotes/' + post.$id + '/');
        sync.remove();
      },

      updateVotes: function (post, voteData) {
        var currentVote;

        var sync = new Firebase(FIREBASE_URL + '/postvotes/' + voteData.postId + '/');
        var postVotes = $firebase(sync).$asArray().$loaded().then(function (vList) {

          //Is there another way to get directly the dataset with the users authorUID?
          currentVote = vList.filter(function (v) {
            return v.authorUID === voteData.authorUID;
          });

          if (currentVote && currentVote[0]) {
            var index = vList.indexOf(currentVote[0]);

            if (vList[index].vote === voteData.vote) {
              vList.$remove(index);
            }
            else {
              vList[index].vote = voteData.vote;
              vList.$save(index);
            }
          }
          else {
            return vList.$add(voteData);
          }
        });

        _getPostVotes([post]);
      },

      updateViews: function (post) {
        var tempPost = $firebase(ref.child(post.$id));
        return tempPost.$update({views: post.views});
      },

      getVotesForPost: function (post) {
        var sync = new Firebase(FIREBASE_URL + '/postvotes/' + post.$id + '/');
        var postVotes = $firebase(sync).$asArray();
        return postVotes;
      },

      getVoteForCurrentUser: function (post, user) {
        var vValue = 0;

        if (post.votesList) {
          post.votesList.forEach(function (v) {
            if (v.authorUID === user.uid) {
              vValue = v.vote;
              return false;
            }
          })
        }
        return vValue;
      },

      getStyleForVoteUpPost: function (post, user)  {
        var currentVote = Post.getVoteForCurrentUser(post, user);
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

      getStyleForVoteDownPost: function(post, user) {
        var currentVote = Post.getVoteForCurrentUser(post, user);
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


    function _getRelatedData(posts) {
      _getCommentCounts(posts);
      _getPostVotes(posts);
    }

    function _getCommentCounts (posts) {
      posts.forEach(function(post) {
        Commentdata.getCommentsForPost(post).$loaded().then(function(c) {
          post.CommentCount = c.length;
          post.comments = c;
        });
      });
    }

    function _getPostVotes (posts) {
      posts.forEach(function(post) {
        Post.getVotesForPost(post).$loaded().then(function(v) {
          var vSum = 0;
          v.forEach(function(vote) {
            vSum += vote.vote;
          });
          post.votes = vSum;
          post.votesList = v || {};
        })
      })
    }

    return Post;
  }]);
