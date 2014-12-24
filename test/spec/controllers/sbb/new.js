'use strict';

describe('Controller: SbbNewCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var SbbNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SbbNewCtrl = $controller('SbbNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
