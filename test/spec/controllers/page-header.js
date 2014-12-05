'use strict';

describe('Controller: PageHeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var PageHeaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PageHeaderCtrl = $controller('PageHeaderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
