'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhItemNewCtrl
 * @description
 * # JhItemNewCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhItemNewCtrl', function ($scope,naguUrpZc,naguMM,siteConfig,$routeParams,naguBz, $location, $rootScope) {


    $scope.item = {
      jhbId: $routeParams['jhbId'],
      appId: siteConfig.AppId,
      Sl: 0,
      Ysdj: 0
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
    dtdMe.then(function(me){
      if(me.Id){
      }
    });

    $scope.actions = {
      createOrSave: function(){
        naguUrpZc.CgJh.createItem($scope.item).then(function(item){
          $location.url('/jh/item/detail/'+ item.Id);
        }, function(result){
          alert(result.msg);
        });
      }
    };
  });
