'use strict';

/**
 * @ngdoc overview
 * @name appstoreApp
 * @description
 * # appstoreApp
 *
 * Main module of the application.
 */
var NG_APP = 'appstoreApp';
angular
  .module('appstoreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'naguModule'
  ])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/sbb/list', {
          templateUrl: 'views/sbb/list.html',
          controller: 'SbbListCtrl'
        })
        .when('/sbb/show/:sbbId', {
          templateUrl: 'views/sbb/show.html',
          controller: 'SbbShowCtrl'
        })
        .when('/sbb/delete', {
          templateUrl: 'views/sbb/delete.html',
          controller: 'SbbDeleteCtrl'
        })
        .when('/sbb/new', {
          templateUrl: 'views/sbb/show.html',
          controller: 'SbbNewCtrl'
        })
        .when('/sbb/createSbbItem/:sbbId', {
          templateUrl: 'views/sbb/createsbbitem.html',
          controller: 'SbbCreatesbbitemCtrl'
        })
        .otherwise({
            templateUrl: 'views/sbb/list.html',
            controller: 'SbbListCtrl'
        });
  });
