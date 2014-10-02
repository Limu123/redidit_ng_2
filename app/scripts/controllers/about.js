'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
