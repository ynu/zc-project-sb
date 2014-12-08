'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbListCtrl
 * @description
 * # SbbListCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbListCtrl', function ($scope, $rootScope, sbbService, naguBz) {
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
              href: '#/sbb/list',
              name:'采购申报表列表'
          }
      ];
      naguBz.Ynu.XB005.getBzItems().then(function (data) {
          $scope.xb005 = data;
      });
      sbbService.listAll().then(function (data) {
          $.each(data, function (i, sbb) {
              data[sbb.SbbId] = sbb;
          });
          $scope.sbbList = data;
      });

      $scope.table = {
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
          }
      }
  });
