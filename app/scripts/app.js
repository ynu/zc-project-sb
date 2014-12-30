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
    'naguModule',
    'naguUrp',
    'ui.utils.masks'
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
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .when('/sbb/apply-user', {
          templateUrl: 'views/sbb/apply-user.html',
          controller: 'SbbApplyUserCtrl'
        })
        .when('/jh/list', {
          templateUrl: 'views/jh/list.html',
          controller: 'JhListCtrl'
        })
        .when('/jh/detail/:jhbId', {
          templateUrl: '../views/jh/detail.html',
          controller: 'JhDetailCtrl'
        })
        .when('/jh/new', {
          templateUrl: '../views/jh/detail.html',
          controller: 'JhNewCtrl'
        })
        .when('/jh/item/detail/:itemId/:jhbId', {
          templateUrl: 'views/jh/item-detail.html',
          controller: 'JhItemDetailCtrl'
        })
        .when('/jh/item/new/:jhbId', {
          templateUrl: 'views/jh/item-detail.html',
          controller: 'JhItemNewCtrl'
        })
        .otherwise({
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        });
  });
