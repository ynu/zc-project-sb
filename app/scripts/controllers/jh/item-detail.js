'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhItemDetailCtrl
 * @description
 * # JhItemDetailCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhItemDetailCtrl', function ($scope,$rootScope, $routeParams, naguBz, naguMM, naguUrpZc, siteConfig,$q) {
    $scope.loading.visible = true;
    $scope.item = {
      Id: $routeParams['itemId'],
      JhbId: $routeParams['jhbId']
    };
    $rootScope.breadcrumb = [
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
        href:'#/jh/detail/'+$scope.item.JhbId
      },
      {
        name: '添加计划采购项目'
      }
    ];

    var dtdXb009 = naguBz.Ynu.XB009.getBzItems2();
    dtdXb009.then(function(bzs){
      $scope.xb009 = bzs;
      $scope.getSubHwlx = function(parent){
        if(!parent) parent = naguBz.Ynu.XB009.Id;
        return _.filter(bzs, function(bz){
          return bz.BelongsToId == parent;
        });
      }
    });

    var dtdJhb = naguUrpZc.CgJh.get($scope.item.JhbId, siteConfig.AppId);
    dtdJhb.then(function(jhb){
      $scope.jhb = jhb;
      $scope.item = _.find(jhb.Items, function(item){
        return item.Id == $scope.item.Id;
      });
    }, function(result){
      alert(result.msg);
    });

    var dtdMe = naguMM.getMe();
    dtdMe.then(function(me){
      if(me.Id){
        $scope.user = me;
        var dtdRoles = naguMM.roles(siteConfig.AppId);
        dtdRoles.then(function(roles){
          $scope.user.isZcGly = _.filter(roles, function(r){
            return r.ConceptId == siteConfig.ZcGlyId;
          }).length> 0;
          $scope.user.isCgGly = _.filter(roles, function(r){
            return r.ConceptId == siteConfig.CgGlyId;
          }).length>0;
          if($scope.user.isZcGly || $scope.user.isCgGly){       // 有权限
          } else{
            alert('无权限');
          }
        });
      }
    });

    $q.all([dtdXb009, dtdMe, dtdJhb]).then(function(){
      $scope.loading.visible = false;
    });

  });
