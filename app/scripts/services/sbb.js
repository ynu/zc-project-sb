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
        SbbStatus: {
            WSB: 'b47e3348-a9ef-421a-b5c7-5fb78255122b',
            YSB: '3516e166-3ea2-4b7a-a892-451600fff979',
            WTG: 'e1bd7952-2216-4cd0-b3cf-f484f2698c80',
            YTG: 'f52a761b-a636-4c6a-8a2c-ae463887e580'
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
