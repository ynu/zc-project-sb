'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhItemDetailCtrl
 * @description
 * # JhItemDetailCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhItemDetailCtrl', function ($scope,$rootScope, $routeParams, naguBz, naguMM, naguUrpZc, siteConfig) {
    $scope.item = {
      Id: $routeParams['itemId']
    };
    $rootScope.breadcrumb = [
      {
        name: '云Urp',
        href: '#'
      },
      {
        name: '云南大学',
        href:'#'
      },
      {
        name: '采购计划管理',
        href: '#/jh/list'
      },
      {
        name: '采购计划表',
        href:'#/jh/detail/'+$scope.item.jhbId
      },
      {
        name: '添加计划采购项目'
      }
    ];

    var dtdXb009 = naguBz.Ynu.XB009.getBzItems2();
    dtdXb009.then(function(bzs){
      $scope.getSubHwlx = function(parent){
        if(!parent) parent = naguBz.Ynu.XB009.Id;
        return _.filter(bzs, function(bz){
          return bz.BelongsToId == parent;
        });
      }
    });

    var dtdMe = naguMM.getMe();
    var dtdGetItem = naguUrpZc.CgJh.getItem($scope.item.Id, siteConfig.AppId);

    dtdMe.then(function(me){
      if(me.Id){
        dtdGetItem.then(function(item){
          $scope.item = item;
        });
      }
    });

  });
