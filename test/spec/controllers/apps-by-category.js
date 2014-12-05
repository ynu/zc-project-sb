'use strict';

describe('Controller: AppsByCategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var AppsByCategoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppsByCategoryCtrl = $controller('AppsByCategoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
