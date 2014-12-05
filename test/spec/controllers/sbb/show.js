'use strict';

describe('Controller: SbbShowCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var SbbShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SbbShowCtrl = $controller('SbbShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
