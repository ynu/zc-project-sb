'use strict';

/**
* @ngInject
**/
function sbbService($q) {
    return {
        listAll: function () {
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/SbbList', {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if (result.ret == 0){
                        $.each(result.data, function (i, sbb) {
                            if(sbb.DJRQ)
                                sbb.DJRQ = new Date(parseInt(sbb.DJRQ.substr(6)));
                            result.data[sbb.SbbId] = sbb;
                        });
                        dtd.resolve(result.data);
                    }
                    else dtd.reject();
                },
                error: function () {
                    dtd.reject();
                }
            });

            return dtd.promise;
        },
        getSbb: function (sbbId) {
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/getSbb/'+ sbbId, {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if (result.ret == 0) {
                        if (result.data.DJRQ) {
                            result.data.DJRQ = new Date(parseInt(result.data.DJRQ.substr(6)));
                        }
                        dtd.resolve(result.data);
                    }
                    else dtd.reject();
                },
                error: function () {
                    dtd.reject();
                }
            });

            return dtd.promise;
        },
        getSbbItems: function (sbbId) {
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/SbbItemList/' + sbbId, {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if (result.ret == 0) {
                        dtd.resolve(result.data);
                    }
                    else dtd.reject();
                },
                error: function () {
                    dtd.reject();
                }
            });

            return dtd.promise;
        },
        getSbbLog: function (sbbId) {
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/GetSbbLog/' + sbbId, {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if (result.ret == 0) {
                        $.each(result.data, function (i, log) {
                            if (log.DateCreated) {
                                log.DateCreated = new Date(parseInt(log.DateCreated.substr(6)));
                            }
                        })

                        dtd.resolve(result.data);
                    }
                    else dtd.reject();
                },
                error: function () {
                    dtd.reject();
                }
            });

            return dtd.promise;
        },
        updateSbb: function (sbb) {
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/UpdateSbb', {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                data: sbb,
                success: function (result) {
                    if (result.ret == 0) {
                        dtd.resolve(result.data);
                    }
                    else dtd.reject(result);
                },
                error: function () {
                    dtd.reject(result);
                }
            });

            return dtd.promise;
        },
        createSbb: function (sbb) {
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/CreateSbb', {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                data: sbb,
                success: function (result) {
                    if (result.ret == 0) {
                        dtd.resolve(result.data);
                    }
                    else dtd.reject(result);
                },
                error: function () {
                    dtd.reject(result);
                }
            });

            return dtd.promise;
        },
        deleteSbb: function(sbbId){
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/Delete/' + sbbId, {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    if (result.ret == 0) {
                        dtd.resolve(result.data);
                    }
                    else dtd.reject(result);
                },
                error: function () {
                    dtd.reject(result);
                }
            });

            return dtd.promise;
        },
        addSbbItem: function(sbbItem){
            var dtd = $q.defer();

            $.ajax('http://ngapi.ynu.edu.cn/YnuZc/AddSbbItem/'+sbbItem.SbbId, {
                type: 'POST',
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                data: sbbItem,
                success: function (result) {
                    if (result.ret == 0) {
                        dtd.resolve(result.data);
                    }
                    else dtd.reject(result);
                },
                error: function () {
                    dtd.reject(result);
                }
            });

            return dtd.promise;
        },
        SbbStatus: {
            WSB: 'b47e3348-a9ef-421a-b5c7-5fb78255122b',
            YSB: '3516e166-3ea2-4b7a-a892-451600fff979',
            WTG: 'e1bd7952-2216-4cd0-b3cf-f484f2698c80',
            YTG: 'f52a761b-a636-4c6a-8a2c-ae463887e580'
        },
        AppId: '80b1ba39-b33c-4139-b192-49eb3d069de9',
        ReadKeys: ['a912afab-9c85-4f17-b3b9-e214abf88044'],
        Roles: {
            UrpAdmin: '2f05ceee-a98c-421a-8264-2dbe5b0a3f0e',                   // URP系统管理员
            ZcAdmin: '90a5302e-fa3c-43a8-a097-479b3b9a765c',                    // 资产系统管理员
            SBR: '40f2c197-785d-4545-aef7-68da2b1fa81a',                        // 采购申报人
            CGGLY: '6f115582-0fd5-4c50-b6a6-20668ceeef03',                      // 采购管理员
            SQZ: '0fd0b62d-8a5f-4be9-b83b-9df628c7b916',                         // 采购系统用户申请者
            User: 'c8611863-76bf-4dab-a897-e9048e608be2'
        },
      applyUser: function(){
        var dtd = $q.defer();



        return dtd.promise;
      }
    };
}


/**
 * @ngdoc service
 * @name appstoreApp.sbb
 * @description
 * # sbb
 * Service in the appstoreApp.
 */
angular.module('appstoreApp')
  .service('sbbService', sbbService);
