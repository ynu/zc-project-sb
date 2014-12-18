'use strict';

/**
 * @ngdoc service
 * @name appstoreApp.siteConfig
 * @description
 * # siteConfig
 * Service in the appstoreApp.
 */
angular.module('appstoreApp')
  .service('siteConfig', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      AppId: '944c4890-a848-44b0-b1d7-a50217cfd405',

      /**
       * 资产管理员RoleId
       */
      ZcGlyId: '47a3b0cc-6d49-43df-ba60-a88be1b43803',

      /*
      * 判断me是否是资产管理员
       */
      isZcGly: function(me){
        return true;
        if(me.TypeFss){
          return $.grep(me.TypeFss, function(fs){
            return fs.Object.ConceptId == '47a3b0cc-6d49-43df-ba60-a88be1b43803'
          }).length > 0
        }
        return false;
      }
    }
  });
