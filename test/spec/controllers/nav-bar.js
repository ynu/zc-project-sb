'use strict';

describe('Controller: NavBarCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var NavBarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavBarCtrl = $controller('NavBarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
