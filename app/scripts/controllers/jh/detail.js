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

        var dtdXb010 = naguBz.Ynu.XB010.getBzItems2();
        dtdXb010.then(function(xb010){
          $scope.xb010 = xb010;
        });

        var dtdMember = naguUrpMM.getMember(me.Id, siteConfig.AppId);
        dtdMember.then(function (member) {
          $scope.member = member;
        });

        $q.all([dtdMember, dtdXb001, dtdJhb, dtdRoles, dtdXb010]).then(function(datas){
          $scope.loading.visible = false;
        });
      }
    });


    $scope.controls = {
      getYsze: function(jhb){
        var amount = .0;
        if(jhb.Items){
          _.each(jhb.Items, function(item){
            amount += item.Sl * item.Ysdj;
          });
        }
        return amount;
      }
    };

    $scope.actions = {
      createOrSaveJhb: function(){
        var bo = {
          title: '出错了',
          content:'xx不能为空',
          autoClose: 2000,
          position: {
            x: 'center',
            y: 'center'
          }
        };
        var validate = function(field, name){
          if(!$scope.jhb[field]){
            bo.content = name + '不能为空';
            new jBox('Notice', bo);
            return false;
          }
          return true;
        };

        if(!validate('CglxId','采购类型') || !validate('Fzr','负责人')
          || !validate('Lxdh','联想电话') || !validate('Jfly','经费来源')
          || !validate('DwId','单位名称')){
          return;
        }
        $scope.loading.visible = true;
        naguUrpZc.CgJh.update($scope.jhb).then(function(jhb){
          $scope.loading.visible = false;
          new jBox('Notice', {
            content: '修改成功',
            autoClose: 1000,
            position: {
              x: 'center',
              y: 'center'
            }
          });
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
    };
  });
