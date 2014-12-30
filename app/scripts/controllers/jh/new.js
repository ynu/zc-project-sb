'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:JhNewCtrl
 * @description
 * # JhNewCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('JhNewCtrl', function ($scope, naguMM, siteConfig, naguUrpMM,naguBz, $q, naguUrpZc,$location, $rootScope) {
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
        name: '创建采购计划表'
      }
    ];

    $scope.jhb = {
      Nd: '2015-01-01',
      AppId: siteConfig.AppId,
      JhlxId: '217af97d-e29d-47c0-98d6-cb2b0f9bd444'
    };

    $scope.loading.visible = true;
    naguMM.getMe().then(function(me){
      if(me.Id){
        $scope.me = me;
        $scope.user = me;
        $scope.jhb.ZcglyId = me.Id;

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

        var memberPromise = naguUrpMM.getMember(me.Id, siteConfig.AppId);
        memberPromise.then(function (member) {
          $scope.member = member;
          $scope.jhb.Lxdh = member.CellPhoneNums[0]+', '+member.OfficeNums[0];
        });
        var xb001Promise = naguBz.Ynu.XB001.getBzItems2();
        xb001Promise.then(function(xb001){
          $scope.xb001 = xb001;
        });
        $q.all([memberPromise, xb001Promise]).then(function(datas){
          var member = datas[0];
          var xb001 = datas[1];
          var depts = [];
          $.each(xb001, function(i, bz){
            depts.push(bz.Id);
          });
          $scope.jhb.DwIds =  _.intersection(depts, member.Depts);
          $scope.loading.visible = false;
        });
      }
    });


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
        naguUrpZc.CgJh.create($scope.jhb).then(function(jhb){
          $location.url('/jh/detail/'+jhb.Id);
          $scope.loading.visible = false;
        }, function(result){
          alert(result.msg);
        });
      }
    }
  });
