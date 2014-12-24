'use strict';

describe('Controller: SbbDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var SbbDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SbbDeleteCtrl = $controller('SbbDeleteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
