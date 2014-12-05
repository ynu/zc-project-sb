'use strict';

describe('Controller: GolbalCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var GolbalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GolbalCtrl = $controller('GolbalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
