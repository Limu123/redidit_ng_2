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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  
  .constant('FIREBASE_URL', 'https://redidit.firebaseio.com')

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
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
