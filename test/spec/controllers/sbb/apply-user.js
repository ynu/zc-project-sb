'use strict';

describe('Controller: SbbApplyUserCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var SbbApplyUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SbbApplyUserCtrl = $controller('SbbApplyUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
