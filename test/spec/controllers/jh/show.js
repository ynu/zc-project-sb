'use strict';

describe('Controller: JhShowCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var JhShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JhShowCtrl = $controller('JhShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
