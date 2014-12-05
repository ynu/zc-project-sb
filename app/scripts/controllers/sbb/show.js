'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbShowCtrl
 * @description
 * # SbbShowCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbShowCtrl', function ($scope, $route) {
      $scope.sbbId = $route.current.params.sbbId;
  });
