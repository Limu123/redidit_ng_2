'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('UserCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
