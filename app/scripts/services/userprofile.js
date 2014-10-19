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
    var ref = new $window.Firebase(FIREBASE_URL);


    // TODO show all userposts on profile-page
    
    var Userprofile = {
      get: function (userId) {
        return $firebase(ref.child('profile').child(userId)).$asObject();
      },
      getPosts: function(userId) {
        var defer = $q.defer();

        $firebase(ref.child('user_posts').child(userId))
          .$asArray()
          .$loaded()
          .then(function(data) {
            var posts = {};

            for(var i = 0; i<data.length; i++) {
              var value = data[i].$value;
              posts[value] = Postdata.get(value);
            }
            defer.resolve(posts);
          });

        return defer.promise;
      }
    };

    return Userprofile;
  });
