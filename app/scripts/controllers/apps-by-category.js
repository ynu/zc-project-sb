'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:AppsByCategoryCtrl
 * @description
 * # AppsByCategoryCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('AppsByCategoryCtrl', function ($scope, $q, $rootScope) {

      $rootScope.loading.visible = true;
      var dtd = $q.defer();
      YnuApp.categories().done(function (cs) {
          $scope.categories = cs;
          var dtds = [];
          for (var i = 0; i < cs.length; i++) {
              dtds.push(YnuApp.listByCategory(cs[i].ConceptId));
          }
          $.when.apply($, dtds).done(function () {
              for (var i = 0; i < arguments.length; i++) {
                  cs[i].apps = arguments[i];
              }
              dtd.resolve(cs);
          });
          
          dtd.promise.then(function (cs) {
              $scope.categories = cs;
              $rootScope.loading.visible = false;
          });

      });
  });