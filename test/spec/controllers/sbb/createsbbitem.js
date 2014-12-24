'use strict';

describe('Controller: SbbCreatesbbitemCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var SbbCreatesbbitemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SbbCreatesbbitemCtrl = $controller('SbbCreatesbbitemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
