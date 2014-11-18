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

    var user_ref = new Firebase(FIREBASE_URL + '/profile/');

    var Userprofile = {

      getUser: function(userId){
        return $firebase(user_ref.child(userId)).$asObject();
      }
    };

    return Userprofile;
  });


