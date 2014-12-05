'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbListCtrl
 * @description
 * # SbbListCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbListCtrl', function ($scope, $rootScope, sbbService, naguBz) {
      $rootScope.breadcrumb = [
          {
              href: '#/',
              name: '首页'
          },
          {
              href: '#/sbb',
              name: '采购申报'
          },
          {
              href: '#/sbb/list',
              name:'采购申报表列表'
          }
      ];
      naguBz.Ynu.XB005.then(function (data) {
          $scope.xb005 = data;
      });
      sbbService.listAll().then(function (data) {
          $scope.sbbList = data;
      });
  });
