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
      JhbId: $routeParams['jhbId'],
      appId: siteConfig.AppId,
      Sl: 0,
      Ysdj: 0
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

    var dtdJhb = naguUrpZc.CgJh.get($scope.item.JhbId, siteConfig.AppId);
    dtdJhb.then(function(jhb){
      $scope.jhb = jhb;
    }, function(result){
      alert(result.msg);
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

      // 保存并继续新建
      createOrSave: function(){
        if(!$scope.controls.validateBeforeSave()) return;

        naguUrpZc.CgJh.createItem($scope.item).then(function(item){
          // 提示已保存
          new jBox('Notice', {
            content:'保存成功',
            autoClose: 1000,
            position: {
              x: 'center',
              y: 'center'
            }
          });
          $scope.item = {
            jhbId: $routeParams['jhbId'],
            appId: siteConfig.AppId,
            Sl: 0,
            Ysdj: 0
          };
        }, function(result){
          alert(result.msg);
        });
      },

      // 保存并返回采购计划表页面
      createOrSaveAndReturn: function(){
        if(!$scope.controls.validateBeforeSave()) return;

        naguUrpZc.CgJh.createItem($scope.item).then(function(item){
          $location.url('/jh/detail/'+ item.JhbId);
        }, function(result){
          alert(result.msg);
        });
      }
    };
  });
