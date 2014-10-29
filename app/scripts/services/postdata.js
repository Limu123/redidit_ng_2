'use strict';

/**
 * @ngdoc service
 * @name rediditApp.postdata
 * @description
 * # postdata
 * Factory in the rediditApp.
 */
angular.module('rediditApp')
  .factory('Postdata', function ($firebase, FIREBASE_URL) {

    // var postdata = [
    //   { id: 1, title:'first title', upvotes:0, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }] },
    //   { id: 2, title:'second title', upvotes:20, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }]  },
    //   { id: 3, title:'third title', upvotes:0, comments: [{text:'first comment', commentupvotes:10 },{text:'second comment', commentupvotes:2 }]  }
    // ];


    var ref = new Firebase(FIREBASE_URL + 'posts');
    var userpost_ref = new Firebase(FIREBASE_URL + 'user_posts');
    var postdata = $firebase(ref).$asArray();    // all posts as an array




    // Public API here
    var Post = {
      all: postdata,
      comments: function (postId) {
        return $firebase(new Firebase(FIREBASE_URL + 'comments/' + postId));
      },
      find: function (postId) {     // backup
        return $firebase(ref.child(postId)).$asObject();
      },
      getPost: function(postId){
        return $firebase(ref.child(postId)).$asObject();
      },
      createPost: function(post){
        return postdata.$add(post).then(function(postRef){
          $firebase(userpost_ref.child(post.authorUID))
                        .$push(postRef.name());
          return postRef;
        });
      },


      deletePost: function(post){
        var postId = post.$id;
        return postdata.$remove(post);
        // TODO: remove post reference from user profile
        // return postdata.$remove(post).then(function(postRef){
        //   //console.log($firebase(userpost_ref.child(post.authorUID)).$asObject());
        //   $firebase(userpost_ref.child(post.authorUID))
        //                 .$remove(postId);
        //   return postRef;
        // });

      },
      updateUpvotes: function(postId,upvote){ 
        var tempPost = $firebase(ref.child(postId));
        return tempPost.$update({ upvotes : upvote });
      },
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
        
      },
      updateViews: function(postId,views){
        var tempPost = $firebase(ref.child(postId));
        return tempPost.$update({ views : views });

      }
    };

    return Post;


  });






