'use strict';

/**
 * @ngdoc function
 * @name appstoreApp.controller:AppManageCtrl
 * @description
 * # AppManageCtrl
 * Controller of the appstoreApp
 */
angular.module('appstoreApp')
  .controller('AppManageCtrl', function ($scope, $q, angularNagu) {
      // 初始化全部类别列表
      angularNagu.YA.categories().then(function (cs) {
          $scope.categories = cs;
      });

      angularNagu.MM.getMe().then(function (me) {
          $scope.appDetail = {};



          // 获取所有应用
          var dtdApps = $q.defer();
          YnuApp.listAllApps().done(function (apps) {
              dtdApps.resolve(apps);
          });
          dtdApps.promise.then(function (apps) {
              $scope.apps = apps;
          });

          // 创建修改按钮方法
          $scope.toUpdateApp = function (appId) {

              $scope.appDetail.curApp = $.grep($scope.apps, function (app) {
                  return app.Id == appId;
              })[0];
              $scope.appDetail.title = '修改应用信息';
          };

          // 打开新建应用窗口
          $scope.toCreateApp = function () {

              // 清空数据
              $scope.appDetail.curApp = null;
              $scope.appDetail.title = '创建新应用';
          };

          // 修改或新建应用窗口中，提交按钮事件：
          $scope.appDetail.submit = function () {

              if ($scope.appDetail.curApp == null) {                        // 

              }

              if (!$scope.appDetail.curApp.Name) {                          // 名称为空时不处理
                  return;
              }
              if ($scope.appDetail.curApp.Id === undefined) {               // 新建应用
                  angularNagu.YA.create({
                      Name: $scope.appDetail.curApp.Name,
                      Desc: $scope.appDetail.curApp.Desc,
                      Dept: $scope.appDetail.curApp.Dept,
                      Categories: $scope.appDetail.curApp.Categories,
                      Url: $scope.appDetail.curApp.Url,
                      ImgUrl: $scope.appDetail.curApp.ImgUrl
                  }).then(function (app) {
                      $scope.appDetail.curApp = null;
                      $scope.apps.unshift(app);
                      $('#modal-add-app').modal('hide');
                  });
              } else {                                                      // 修改应用

                  var fss = [];                                             // 构造语句集合

                  fss.push({                                                // 应用名称
                      SubjectId: $scope.appDetail.curApp.Id,
                      SType: Nagu.MType.Concept,
                      PredicateId: Nagu.Rdfs.Label,
                      Object: $scope.appDetail.curApp.Name,
                      OType: Nagu.MType.Literal,
                      AppId: YnuApp.AppId
                  });

                  if ($scope.appDetail.curApp.Desc) {
                      fss.push({                                                // 应用描述
                          SubjectId: $scope.appDetail.curApp.Id,
                          SType: Nagu.MType.Concept,
                          PredicateId: Nagu.Rdfs.Comment,
                          Object: $scope.appDetail.curApp.Desc,
                          OType: Nagu.MType.Literal,
                          AppId: YnuApp.AppId
                      });
                  }

                  if ($scope.appDetail.curApp.Dept) {
                      fss.push({                                                // 应用归属部门
                          SubjectId: $scope.appDetail.curApp.Id,
                          SType: Nagu.MType.Concept,
                          PredicateId: AppStore.Concepts.Dept,
                          Object: $scope.appDetail.curApp.Dept,
                          OType: Nagu.MType.Concept,
                          AppId: YnuApp.AppId
                      });
                  }

                  if ($scope.appDetail.curApp.Categories.length > 0) {
                      fss.push({                                                // 应用类别
                          SubjectId: $scope.appDetail.curApp.Id,
                          SType: Nagu.MType.Concept,
                          PredicateId: AppStore.Concepts.hasCategory,
                          Object: $scope.appDetail.curApp.Categories[0],
                          OType: Nagu.MType.Concept,
                          AppId: YnuApp.AppId
                      });
                  }

                  if ($scope.appDetail.curApp.Url) {
                      fss.push({                                                // 应用Url
                          SubjectId: $scope.appDetail.curApp.Id,
                          SType: Nagu.MType.Concept,
                          PredicateId: AppStore.Concepts.hasUrl,
                          Object: $scope.appDetail.curApp.Url,
                          OType: Nagu.MType.Literal,
                          AppId: YnuApp.AppId
                      });
                  }

                  if ($scope.appDetail.curApp.ImgUrl) {
                      fss.push({                                                // 应用图标Url
                          SubjectId: $scope.appDetail.curApp.Id,
                          SType: Nagu.MType.Concept,
                          PredicateId: AppStore.Concepts.hasImgUrl,
                          Object: $scope.appDetail.curApp.ImgUrl,
                          OType: Nagu.MType.Literal,
                          AppId: YnuApp.AppId
                      });
                  }

                  if ($scope.appDetail.curApp.Categories.length > 1) {          // 添加额外的应用类别
                      var fss2 = [];
                      for (var i = 1; i < $scope.appDetail.curApp.Categories.length; i++) {
                          fss2.push({                                                // 应用类别
                              SubjectId: $scope.appDetail.curApp.Id,
                              SType: Nagu.MType.Concept,
                              PredicateId: AppStore.Concepts.hasCategory,
                              Object: $scope.appDetail.curApp.Categories[i],
                              OType: Nagu.MType.Concept,
                              AppId: YnuApp.AppId
                          });
                      }
                  }

                  var dtd = $q.defer();


                  Nagu.SM.bulkSingleForSP(fss).done(function (fssreturn) {
                      if (fss2 && fss2.length > 0) {
                          Nagu.SM.bulkCreate(fss2).done(function (fssreturn2) {
                              dtd.resolve(fssreturn, fssreturn2);
                          }).fail(function () {
                              dtd.reject();
                          });
                      } else {
                          dtd.resolve(fssreturn, []);
                      }
                  }).fail(function () {
                      dtd.reject();
                  });
                  dtd.promise.then(function (fss, fss2) {
                      $scope.appDetail.curApp == null;
                      $('#modal-add-app').modal('hide');
                  });

              }

          };
      });
      
  });