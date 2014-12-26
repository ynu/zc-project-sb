'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhListCtrl
 * @description
 * # JhListCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhListCtrl', function ($scope,naguUrpZc, siteConfig, naguMM,$q, naguBz, $location,$rootScope, naguRole) {
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
        name: '采购计划管理'
      }
    ];

    $scope.user = {
      // 是否是资产管理员
      isZcGly: false
    };

    var dtdMe = naguMM.getMe();
    dtdMe.then(function(me){
      if(me.Id){
        naguMM.roles(siteConfig.AppId).then(function(roles){
          $scope.user.isZcGly = _.filter(roles, function(r){
              return r.ConceptId == siteConfig.ZcGlyId;
            }).length> 0;
          $scope.user.isCgGly = _.filter(roles, function(r){
            return r.ConceptId == siteConfig.CgGlyId;
          }).length>0;
          if($scope.user.isZcGly || $scope.user.isCgGly){       // 有权限
            naguUrpZc.CgJh.list(siteConfig.AppId).then(function(jhbs){
              $scope.jhbList = jhbs;
            });
          } else{
            alert('无权限');
          }
        });

      } else{
        window.location = 'http://members.apps.ynu.edu.cn/#/user/login?returnUrl='+ encodeURIComponent($location.absUrl());
      }
    });



    var dtdXb001 = naguBz.Ynu.XB001.getBzItems2();
    dtdXb001.then(function(xb001){
      $scope.xb001 = xb001;
    });

    var dtdXb010 = naguBz.Ynu.XB010.getBzItems2();
    dtdXb010.then(function(xb010){
      $scope.xb010 = xb010;
    });

    $scope.loading.visible = true;
    $q.all([dtdMe, dtdXb001, dtdXb010]).then(function(){
      $scope.loading.visible = false;
    });

    $scope.actions = {
      remove: function(jhb) {
        if (confirm('确实要删除采购计划表吗？')) {
          $scope.loading.visible = true;
          naguUrpZc.CgJh.remove(jhb.Id, siteConfig.AppId).then(function () {
            $scope.jhbList = _.filter($scope.jhbList, function(b){
              return jhb.Id != b.Id;
            });
            $scope.loading.visible = false;
          })
        }
      },
      submit: function(jhb){
        if (confirm('确实要提交采购计划表吗？')) {
          $scope.loading.visible = true;
          naguUrpZc.CgJh.submit(jhb.Id, siteConfig.AppId).then(function () {
            jhb.IsSubmitted = true;
            $scope.loading.visible = false;
          }, function(result){
            alert(result.msg);
            $scope.loading.visible = false;
          });
        }
      },
      approve: function(jhb){
        if (confirm('确实要通过采购计划表吗？')) {
          $scope.loading.visible = true;
          naguUrpZc.CgJh.approve(jhb.Id, siteConfig.AppId).then(function () {
            jhb.IsApproved = true;
            $scope.loading.visible = false;
          }, function(result){
            alert(result.msg);
            $scope.loading.visible = false;
          });
        }
      },
      reject: function(jhb){
        var msg = prompt('请输入驳回理由');
        if (msg) {
          $scope.loading.visible = true;
          naguUrpZc.CgJh.reject(jhb.Id, siteConfig.AppId, msg).then(function () {
            $scope.jhbList = _.filter($scope.jhbList, function(b){
              return jhb.Id != b.Id;
            });
            $scope.loading.visible = false;
          }, function(result){
            alert(result.msg);
            $scope.loading.visible = false;
          });
        }
      }
    };

    $scope.controls = {
      canSubmit: function(jhb){
        if($scope.user.isZcGly && !jhb.IsSubmitted) {
          return true;
        } else {
          return false;
        }
      },
      canApproveOrReject: function(jhb){
        if($scope.user.isCgGly && jhb.IsSubmitted && !jhb.IsApproved) return true;
        else return false;
      },
      canDelete: function(jhb){
        if($scope.user.isZcGly && !jhb.IsSubmitted){
          return true;
        } else {
          return false;
        }
      },
      canNew: function(){
        return $scope.user.isZcGly;
      }
    };
  });
