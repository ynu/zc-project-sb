'use strict';

describe('Controller: JhItemDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var JhItemDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JhItemDetailCtrl = $controller('JhItemDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
