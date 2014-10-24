'use strict';

/**
 * @ngdoc service
 * @name rediditApp.Userprofile
 * @description
 * # Userprofile
 * Factory in the rediditApp.
 */

angular.module('rediditApp')
  .factory('Userprofile', function ($window, FIREBASE_URL, $firebase, Postdata, $q) {
    //var ref = new $window.Firebase(FIREBASE_URL);
    var userpost_ref = new Firebase(FIREBASE_URL + 'user_posts');
    var user_postdata = $firebase(userpost_ref).$asArray();    // all posts as an array



    
    var Userprofile = {
      get: function (userId) {
        return $firebase(userpost_ref.child(userId)).$asObject();
      },
      getPosts: function(userId) {

        var defer = $q.defer();

        $firebase(userpost_ref.child(userId))
          .$asArray()
          .$loaded()
          .then(function(data) {
            var posts = {};

            for(var i = 0; i<data.length; i++) {
              var value = data[i].$value;
              console.log(value);
              posts[value] = Postdata.getPost(value);
            }

            defer.resolve(posts);

          });

          return defer.promise;
      }
    };

    return Userprofile;
  });


