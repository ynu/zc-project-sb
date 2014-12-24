'use strict';

describe('Controller: JhListCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var JhListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JhListCtrl = $controller('JhListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
