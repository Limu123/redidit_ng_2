'use strict';

/**
 * @ngdoc service
 * @name rediditApp.postdata
 * @description
 * # postdata
 * Factory in the rediditApp.
 */
angular.module('rediditApp')
  .factory('Postdata', ['$firebase', 'FIREBASE_URL', function ($firebase, FIREBASE_URL) {

    // var postdata = [
    //   { id: 1, title:'first title', upvotes:0, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }] },
    //   { id: 2, title:'second title', upvotes:20, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }]  },
    //   { id: 3, title:'third title', upvotes:0, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }]  }
    // ];

    var ref = new Firebase(FIREBASE_URL + '/posts');
    var userpost_ref = new Firebase(FIREBASE_URL + 'user_posts');
    var postdata = $firebase(ref);

    var Post = {

      all: function() {
        return postdata.$asArray();
      },

      find: function (postId) {     // backup
        return $firebase(ref.child(postId)).$asObject();
      },

      getPost: function(postId){
        return $firebase(ref.child(postId)).$asObject();
      },

      /*
      createPost: function(post){
        return postdata.$asArray().$add(post).then(function(postRef){
          $firebase(userpost_ref.child(post.authorUID))
                        .$push(postRef.name());
          return postRef;
        });
      },
      */

      createPost: function(post){
        return postdata.$asArray().$add(post);
      },

      deletePost: function(post){
        return postdata.$asArray().$remove(post);
      },

      //updateVotes: function(post){
      //  var tempPost = $firebase(ref.child(post.$id));
      //  return tempPost.$update({ votes : post.votes });
      //},

      updateVotes: function(post, voteData){
        var currentVote;

        var sync = new Firebase(FIREBASE_URL + '/postvotes/' + post.$id + '/');
        var postVotes = $firebase(sync).$asArray().$loaded().then(function(vList) {

          //Is there another way to get directly the dataset with the users authorUID?
          currentVote = vList.filter(function(v) {
            return v.authorUID === voteData.authorUID;
          });

          if (currentVote && currentVote[0]) {
            var index = vList.indexOf(currentVote[0]);
            vList[index].vote = voteData.vote;
            return vList.$save(index);
          }
          else {
            return vList.$add(voteData);
          }
        });
      },

      updateViews: function(post){
        var tempPost = $firebase(ref.child(post.$id));
        return tempPost.$update({ views : post.views });
      },

      getVotesForPost: function(post){
        var sync = new Firebase(FIREBASE_URL + '/postvotes/' + post.$id + '/');
        var postVotes = $firebase(sync).$asArray();
        return postVotes;
      }

      /*
      createComment: function(comment, postId){
        return Post.comments(postId).$push(comment);
      },
      deleteComment: function(comment, postId){
        var commentId = comment.$id;
        return Post.comments(postId).$remove(commentId);
      },
      updateCommentUpvotes: function(comment,postId,upvote){
        var commentId = comment.$id;
        var tempComment = $firebase(ref.child(postId).child(commentId));
        //console.log(tempComment.$asObject());
        return tempComment.$update({ commentupvotes: upvote });
        // TODO
      }
      */

    };

    return Post;
  }]);






