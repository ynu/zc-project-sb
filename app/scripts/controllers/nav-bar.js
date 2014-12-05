'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('NavBarCtrl', function ($scope, $q, $rootScope) {
      $scope.version = '1.2.0';
      var meDtd = $q.defer();
      Nagu.MM.getMe().done(function (me) {
          if (me.ret == 0) meDtd.resolve(me);
          else meDtd.reject();
      });
      meDtd.promise.then(function (me) {
          $rootScope.me = me;
          if (me.FigureUrls.length == 0 || me.FigureUrls[0] == '/Content/Images/logo.png')
              me.FigureUrls[0] = 'http://ngapi.ynu.edu.cn/Content/Images/logo.png';
      })
  });
