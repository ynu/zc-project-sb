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
