'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('HeaderCtrl', function ($scope, $location, $rootScope, angularNagu) {

      if ($rootScope.loading === undefined)
          $rootScope.loading = {
              text: '正在加载，请稍侯...'
          };

      $scope.isActive = function (curPath) {                            // 判断指定的path是不是当前path，主要用于ng-class给指定元素添加active类
          return curPath == $location.path();
      };

      $scope.isHome = function () {
          return $location.path() == ''
              || $location.path() == '/'
              || $location.path() == '/home';
      }

      // 初始化部门列表 v2
      angularNagu.YB.getXB001().then(function (xb001) {
          $rootScope.depts = xb001;
          $rootScope.getSubDepts = function (parentId) {
              if (parentId === undefined) parentId = YB.XB.XB001Id;

              var depts = [];
              for (var i = 0; i < $scope.depts.length; i++) {
                  if ($scope.depts[i].BelongsToId == parentId) {
                      depts.push($scope.depts[i]);
                  }
              }
              return depts;
          }
      });

      
  });