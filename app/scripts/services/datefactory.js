'use strict';

/**
 * @ngdoc service
 * @name rediditApp.datefactory
 * @description
 * # datefactory
 * Factory in the rediditApp.
 */
angular.module('rediditApp')
  .factory('Datefactory', function () {


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = dd+'/'+mm+'/'+yyyy;



    // Public API here
    return {
      getDate: function () {
        return today;
      }
    };
  });
