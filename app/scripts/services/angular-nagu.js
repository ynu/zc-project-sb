'use strict';



/**
 * @ngdoc service
 * @name appstoreApp.angularNagu
 * @description
 * # angularNagu
 * Service in the appstoreApp.
 */
if (NG_APP === undefined) {
    alert('NG_APP未定义，请在app.js中定义此变量，并赋值为ngApp的名称');
}
angular.module(NG_APP)
  .service('angularNagu', function ($q) {
      var context = {
          me: null
      };

      var cache = {
          XB001: null
      };
      return {
          // AngularJS will instantiate a singleton by calling "new" on this function
          context: context,
          MM: {
              getMe: function () {
                  var dtd = $q.defer();
                  if (context.me != null) dtd.resolve(context.me);
                  else {
                      Nagu.MM.getMe().done(function (me) {
                          context.me = me;
                          dtd.resolve(me);
                      })
                  }
                  return dtd.promise;
              }
          },
          YA: {
              categories: function () {
                  var dtd = $q.defer();
                  YnuApp.categories().done(function (cs) {
                      for (var i = 0; i < cs.length; i++) {
                          cs[cs[i].ConceptId] = cs[i];
                      }
                      dtd.resolve(cs);
                  });
                  return dtd.promise;
              },
              create: function (app) {
                  var dtd = $q.defer();
                  YnuApp.create(app.Name, app.Desc, app.Dept, app.Categories, app.Url, app.ImgUrl).done(function (appDone) {
                      dtd.resolve(appDone);
                  });
                  return dtd.promise;
              }
          },
          YB: {
              /*
              获取校标 XB 001 的数据
              返回值：XB001[] https://app.yinxiang.com/shard/s11/sh/5076a816-eb7f-4f3e-a893-e16d55aeb563/925659a0fea96a346b4ad1701cb17b88
              */
              getXB001: function () {
                  var dtd = $q.defer();
                  if (cache.XB001 != null) dtd.resolve(cache.XB001);
                  else {
                      var yb = new YnuBz();
                      yb.getXB001().done(function (xb001) {
                          for (var i = 0; i < xb001.length; i++) {
                              xb001[xb001[i].Id] = xb001[i];
                          }
                          cache.XB001 = xb001;
                          dtd.resolve(xb001);
                      })
                  }
                  return dtd.promise;
              }
          },
          SM: {
              bulkSingleForSP: function (fss) {
                  var dtd = $q.defer();
                  Nagu.SM.bulkSingleForSP(fss).done(function (data) {
                      dtd.resolve(data);
                  }).fail(function () {
                      dtd.reject();
                  });
                  return dtd.promise;
              }
          }
      };
  });
