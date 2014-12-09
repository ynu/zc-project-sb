'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbListCtrl
 * @description
 * # SbbListCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbListCtrl', function ($scope, $rootScope, sbbService, naguBz,naguMM,$location,$q) {
      $rootScope.breadcrumb = [
          {
              href: '#/',
              name: '首页'
          },
          {
              href: '#/sbb',
              name: '采购申报'
          },
          {
              name:'采购申报表列表'
          }
      ];
      naguBz.Ynu.XB005.getBzItems().then(function (data) {                                      // 获取“采购项目状态标准”
          $scope.xb005 = data;
      });
      $scope.me = {
          ret: -1
      };
      naguMM.getMe().then(function (me) {
          if (me.ret == 0) {                                                                    // 用户已登录
              var dtdSbb = sbbService.listAll();
              var dtdRoles = naguMM.roles(me.Id, sbbService.AppId, sbbService.ReadKeys); 

              $q.all([dtdSbb, dtdRoles]).then(function (dataArray) {
                  $scope.sbbList = dataArray[0];                                                // 获取所有SBB
                  $scope.roles = dataArray[1];                                                  // 获取当前用户的角色
              });
          } else {                                                                              // 用户未登录
              $location.url('/login?returnUrl=' + encodeURIComponent($location.absUrl()));
          }
      });

      $scope.canDeny = function (sbbId) {                                                       // 判断是否能够被否决
          var sbb = $scope.sbbList[sbbId];
          if ($scope.roles[sbbService.Roles.CGGLY]) {                                           // 采购管理员才可否决
              if (sbb.Status == sbbService.SbbStatus.YSB) {                                     // SBB已提交时可以否决
                  return true;
              }
          }
          return false;
      }

      $scope.canSubmit = function (sbbId) {                                                    // 判断是否能够被提交
          var sbb = $scope.sbbList[sbbId];
          if ($scope.roles[sbbService.Roles.SBR]) {
              if (sbb.Status == sbbService.SbbStatus.WSB) {
                  return true;
              }
          }
          return false;
      }

      $scope.canDelete = function (sbbId) {                                                    // 判断是否能够被删除
          var sbb = $scope.sbbList[sbbId];
          if ($scope.roles[sbbService.Roles.SBR]) {
              if (sbb.Status == sbbService.SbbStatus.WSB) {
                  return true;
              }
          }
          return false;
      }

      $scope.canPass = function (sbbId) {                                                            // 判断是否能够被通过
          var sbb = $scope.sbbList[sbbId];
          if ($scope.roles[sbbService.Roles.CGGLY]) {                                           // 采购管理员才可通过
              if (sbb.Status == sbbService.SbbStatus.YSB) {
                  return true;
              }
          }
          return false;
      }

      $scope.actions = {
          denySbb: function (sbbId) {
              var sbb = $scope.sbbList[sbbId];
              var msg = prompt('您将要否决申报表\"' + sbb.XMMC + '\"\r\n请输入否决此申报表的原因：');
              if (msg) {
                  $rootScope.loading.visible = true;
                  sbb.Status = sbbService.SbbStatus.WTG;
                  sbb.StatusMsg = msg;
                  sbbService.updateSbb(sbb).then(function () {
                      $rootScope.loading.visible = false;
                  });
              }
          },
          submitSbb: function (sbbId) {
              var sbb = $scope.sbbList[sbbId];
              if (confirm('确定要提交申报表\"' + sbb.XMMC + '\"吗？')) {
                  $rootScope.loading.visible = true;
                  sbb.Status = sbbService.SbbStatus.YSB;
                  sbbService.updateSbb(sbb).then(function () {
                      $rootScope.loading.visible = false;
                  });
              }
          },
          deleteSbb: function (sbbId) {
              var sbb = $scope.sbbList[sbbId];
              if (confirm('确定要删除申报表\"' + sbb.XMMC + '\"吗？')) {
                  $rootScope.loading.visible = true;
                  sbbService.deleteSbb(sbbId).then(function () {
                      $scope.sbbList.remove($scope.sbbList[sbbId]);
                      $rootScope.loading.visible = false;
                  });
              }
          }
      }
  });
