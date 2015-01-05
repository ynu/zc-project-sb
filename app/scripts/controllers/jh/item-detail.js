'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhItemDetailCtrl
 * @description
 * # JhItemDetailCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhItemDetailCtrl', function ($scope,$rootScope, $routeParams, naguBz, naguMM, naguUrpZc, siteConfig,$q, $location) {
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
      if(me.Id){                                                      // 当前用户已登录
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
      } else {                                                        // 当前用户未登录
      siteConfig.redirectToLogin();                                   // 跳转至登录页面
      }
    });

    $q.all([dtdXb009, dtdMe, dtdJhb]).then(function(){
      $scope.loading.visible = false;
    });

    $scope.controls = {
      // 验证字段值不为空，出错时显示提示
      validate: function(field, name){
        var bo = {
          title: '出错了',
          content:'xx不能为空',
          autoClose: 2000,
          position: {
            x: 'center',
            y: 'center'
          }
        };
        if(!$scope.item[field]){
          bo.content = name + '不能为空';
          new jBox('Notice', bo);
          return false;
        }
        return true;
      },
      // 保存前进行验证
      validateBeforeSave: function(){
        var hjje = $scope.item.Sl * $scope.item.Ysdj;
        if(isNaN(hjje) || hjje <= 0) {
          new jBox('Notice', {
            title: '出错了',
            content:'数量和预算单价不能为0',
            autoClose: 2000,
            position: {
              x: 'center',
              y: 'center'
            }
          });
          return false;
        }

        if(!$scope.controls.validate('HwlxId','货物类型')
          || !$scope.controls.validate('Tymc','通用名称')
          || !$scope.controls.validate('Sl','数量')
          || !$scope.controls.validate('Jldw','计量单位')
          || !$scope.controls.validate('Ysdj','预算单价')
          || !$scope.controls.validate('Jhdd','交货地点'))
          return false;
        else return true;
      }
    };
    $scope.actions = {
      // 保存并返回采购计划表页面
      createOrSaveAndReturn: function(){
        if(!$scope.controls.validateBeforeSave()) return;

        naguUrpZc.CgJh.updateItem($scope.item).then(function(item){
          $location.url('/jh/detail/'+ item.JhbId);
        }, function(result){
          alert(result.msg);
        });
      }
    };
  });
