'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:PageHeaderCtrl
 * @description
 * # PageHeaderCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('PageHeaderCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
