'use strict';

/**
 * @ngdoc overview
 * @name rediditApp
 * @description
 * # rediditApp
 *
 * Main module of the application.
 */
angular
  .module('rediditApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'firebase',
    'iso.directives',
    'ngNotification'
  ])

  //.constant('FIREBASE_URL', 'https://redidit.firebaseio.com')
  .constant('FIREBASE_URL', 'https://redidit-test.firebaseio.com')

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/detail/:postId', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/newpost', {
        templateUrl: 'views/newpost.html',
        controller: 'NewpostCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
