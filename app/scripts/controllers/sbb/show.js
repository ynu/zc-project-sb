'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbShowCtrl
 * @description
 * # SbbShowCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbShowCtrl', function ($scope, $route, sbbService, $rootScope) {
      $scope.sbb = {};
      var sbbId = $route.current.params.sbbId;

      

      
      $('#DJRQ').pickadate({
          format:'yyyy-mm-dd'
      });

      sbbService.getSbb(sbbId).then(function (sbb) {
          $scope.sbb = sbb;

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
              name: $scope.sbb.XMMC
          }
          ];
      });

      sbbService.getSbbItems(sbbId).then(function (items) {
          $scope.sbbItems = items;
      });

      sbbService.getSbbLog(sbbId).then(function (logs) {
          $scope.sbbLogs = logs;
      });

      $scope.actions = {
          save: function () {
              var sbb = $scope.sbb;
              if (sbb.CGLX == '' || sbb.XMMC == '') {
                  alert('采购类型和项目名称必须填写');
                  return;
              }
              $scope.loading.visible = true;
              sbbService.updateSbb(sbb).then(function (sbb) {
                  $scope.loading.visible = false;
              });
          }
      };
  });
