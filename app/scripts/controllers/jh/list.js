'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhListCtrl
 * @description
 * # JhListCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhListCtrl', function ($scope,naguUrpZc, siteConfig, naguMM,$q, naguBz, $location,$rootScope) {
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
      isZcgly: false
    };

    var dtdMe = naguMM.getMe();
    dtdMe.then(function(me){
      if(me.Id){
        if(siteConfig.isZcGly(me)){       // 有权限
          $scope.user.isZcGly = true;
          naguUrpZc.CgJh.list(siteConfig.AppId).then(function(jhbs){
            $scope.jhbList = jhbs;
          });
        }
        else{
          alert('无权限');
        }
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
      canApproved: function(jhb){
        return false;
      },
      canDelete: function(jhb){
        if($scope.user.isZcGly && !jhb.IsSubmitted){
          return true;
        } else {
          return false;
        }
      }
    };
  });
