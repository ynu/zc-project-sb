'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('NavBarCtrl', function ($scope, $q, $rootScope, $location, naguMM,sbbService) {
      $scope.version = '1.4.0';
      $scope.me = {};

      naguMM.getMe().then(function (me) {
          $scope.me = me;
          if (me.ret == 0) {
              if (me.FigureUrls.length == 0 || me.FigureUrls[0] == '/Content/Images/logo.png')
                  me.FigureUrls[0] = 'http://ngapi.ynu.edu.cn/Content/Images/logo.png';
          }
        // 以下提供用户自助申请的功能
          //naguMM.roles(me.Id, sbbService.AppId, sbbService.ReadKeys)
          //    .then(function (roles) {
          //        if (roles.length == 0) $location.url('/sbb/apply-user');
          //        else if (roles[sbbService.Roles.SQZ]) {
          //            alert('已申请了，请等待');
          //        }
          //});
      })


      $scope.actions = {
          logout: function () {
              naguMM.logout().then(function () {
                window.location = 'http://members.apps.ynu.edu.cn/#/user/login?returnUrl='+ encodeURIComponent($location.absUrl());
              });
          }
      };
  });
