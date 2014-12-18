'use strict';

describe('Controller: JhbDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var JhbDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JhbDetailCtrl = $controller('JhbDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
