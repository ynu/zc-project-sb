'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:SbbNewCtrl
 * @description
 * # SbbNewCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('SbbNewCtrl', function ($scope,$rootScope, naguBz, sbbService) {
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
                href: '#/sbb/new',
                name: '创建采购申报表'
            }
      ];

      $('#DJRQ').pickadate({
          format: 'yyyy-mm-dd'
      });

      $scope.sbb = {}

      $scope.actions = {
          save: function () {
              var sbb = $scope.sbb;
              if (sbb.CGLX == '' || sbb.XMMC == '') {
                  alert('采购类型和项目名称必须填写');
                  return;
              }
              $scope.loading.visible = true;
              sbbService.createSbb(sbb).then(function (sbb) {
                  window.location = '#/sbb/show/' + sbb.SbbId;
                  $scope.loading.visible = false;
              });
          }
      }
  });
