'use strict';

describe('Controller: AppManageCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var AppManageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppManageCtrl = $controller('AppManageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
