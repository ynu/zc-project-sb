'use strict';

describe('Controller: JhItemNewCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var JhItemNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JhItemNewCtrl = $controller('JhItemNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
