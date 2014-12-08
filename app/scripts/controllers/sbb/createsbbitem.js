'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbCreatesbbitemCtrl
 * @description
 * # SbbCreatesbbitemCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbCreatesbbitemCtrl', function ($scope, $route, sbbService, $rootScope) {
      var sbbId = $route.current.params.sbbId;
      $scope.sbbItem = {
          SbbId: sbbId
      };
      
      sbbService.getSbb(sbbId).then(function (sbb) {
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
              name: '采购申报表列表'
          },
          {
              href: '#/sbb/show/' + sbbId,
              name: sbb.XMMC
          },
          {
              name: '添加采购项'
          }
          ];
      });

      $scope.actions = {
          computeHJJE: function(){
              $scope.sbbItem.HJJE = parseInt($scope.sbbItem.SL) * parseFloat($scope.sbbItem.YSDJ);
          },
          saveAndReturn: function () {
              if ($scope.sbbItem.TYMC == '' || $scope.sbbItem.HWLX == '') {
                  alert('类型和名称必须填写');
                  return;
              }
              $scope.loading.visible = true;
              sbbService.addSbbItem($scope.sbbItem).then(function () {
                  window.location = '#/sbb/show/' + sbbId;
                  $scope.loading.visible = false;
              });
          },
          saveAndNew: function () {
              if ($scope.sbbItem.TYMC == '' || $scope.sbbItem.HWLX == '') {
                  alert('类型和名称必须填写');
                  return;
              }
              $scope.loading.visible = true;
              sbbService.addSbbItem($scope.sbbItem).then(function () {
                  $scope.sbbItem = {
                      SbbId: sbbId
                  };
                  $scope.loading.visible = false;
              });
          }
      }
  });
