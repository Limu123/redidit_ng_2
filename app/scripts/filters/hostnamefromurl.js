'use strict';

/**
 * @ngdoc filter
 * @name rediditApp.filter:hostnameFromUrl
 * @function
 * @description
 * # hostnameFromUrl
 * Filter in the rediditApp.
 */
angular.module('rediditApp')
  .filter('hostnameFromUrl', function () {
  return function (str) {
    var url = document.createElement('a');

    url.href = str;

    return url.hostname;
  };
});
