'use strict';

/**
 * @ngdoc filter
 * @name rediditApp.filter:reverse
 * @function
 * @description
 * # reverse
 * Filter in the rediditApp.
 */
angular.module('rediditApp')
  .filter('reverse', function () {
    return function(items) {
      return items.slice().reverse();
    };
  });
