'use strict';

/**
 * @ngdoc function
 * @name rediditApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the rediditApp
 */
angular.module('rediditApp')
  .controller('SettingsCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
