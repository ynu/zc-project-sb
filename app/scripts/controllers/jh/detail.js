'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhDetailCtrl
 * @description
 * # JhDetailCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhDetailCtrl', function ($scope, naguMM, siteConfig, naguUrpMM,naguBz, $q, naguUrpZc,$routeParams, $rootScope) {
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
        name: '采购计划表'
      }
    ];

    var jhbId = $routeParams['jhbId'];

    $scope.loading.visible = true;

    var dtdMe = naguMM.getMe();
    dtdMe.then(function(me){
      if(me.Id){
        $scope.me = me;

        var dtdJhb = naguUrpZc.CgJh.get(jhbId, siteConfig.AppId);

        dtdJhb.then(function(jhb){
          $scope.jhb = jhb;
        }, function(result){
          alert(result.msg);
        });

        var dtdXb001 = naguBz.Ynu.XB001.getBzItems2();
        dtdXb001.then(function(xb001){
          $scope.xb001 = xb001;
        });

        var dtdXb009 = naguBz.Ynu.XB009.getBzItems2();
        dtdXb009.then(function(xb009){
          $scope.xb009 = xb009;
        });
        var dtdMember = naguUrpMM.getMember(me.Id, siteConfig.AppId);
        dtdMember.then(function (member) {
          $scope.member = member;
        });

        $q.all([dtdMember, dtdXb001, dtdJhb]).then(function(datas){
          $scope.loading.visible = false;
        });
      }
    });


    $scope.actions = {
      createOrSaveJhb: function(){
        $scope.loading.visible = true;
        naguUrpZc.CgJh.update($scope.jhb).then(function(jhb){
          $scope.loading.visible = false;
        },function(result){
          alert(result.msg);
          $scope.loading.visible = false;
        });
      },
      deleteItem: function(item){
        if(confirm('确定要删除计划采购项目：'+ item.Tymc +'吗？')){
          naguUrpZc.CgJh.deleteItem(item).then(function(){
            $scope.jhb.Items = _.filter($scope.jhb.Items, function(b){
              return item.Id != b.Id;
            });
          }, function(result){
            alert(result.msg);
          });
        }

      }
    }
  });
