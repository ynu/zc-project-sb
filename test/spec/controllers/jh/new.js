'use strict';

describe('Controller: JhNewCtrl', function () {

  // load the controller's module
  beforeEach(module('appstoreApp'));

  var JhNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JhNewCtrl = $controller('JhNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
