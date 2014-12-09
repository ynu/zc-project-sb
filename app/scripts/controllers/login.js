'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('LoginCtrl', function ($scope, naguMM, naguConfig,$route) {
      $scope.host = naguConfig.hosts[0];
      var returnUrl = $route.current.params.returnUrl;
      if (!returnUrl) returnUrl = window.location;
      $scope.returnUrl = encodeURIComponent(returnUrl);

      $scope.actions = {
      };
  });
