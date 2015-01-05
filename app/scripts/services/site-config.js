'use strict';

/**
 * @ngdoc service
 * @name appstoreApp.siteConfig
 * @description
 * # siteConfig
 * Service in the appstoreApp.
 */
angular.module('appstoreApp')
  .service('siteConfig', function ($location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      AppId: '944c4890-a848-44b0-b1d7-a50217cfd405',

      /**
       * 资产管理员RoleId
       */
      ZcGlyId: '47a3b0cc-6d49-43df-ba60-a88be1b43803',

      /**
       * 采购管理员RoleId
       */
      CgGlyId: '6f115582-0fd5-4c50-b6a6-20668ceeef03',

      /*
      * 判断me是否是资产管理员
       */
      isZcGly: function(me){
        if(me.TypeFss){
          return $.grep(me.TypeFss, function(fs){
            return fs.Object.ConceptId == '47a3b0cc-6d49-43df-ba60-a88be1b43803'
          }).length > 0
        }
        return false;
      },
      redirectToLogin: function(){
        window.location = 'http://members.apps.ynu.edu.cn/#/user/login?returnUrl='+ encodeURIComponent($location.absUrl());
      }
    }
  });
