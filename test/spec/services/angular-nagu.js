'use strict';

describe('Service: angularNagu', function () {

  // load the service's module
  beforeEach(module('appstoreApp'));

  // instantiate service
  var angularNagu;
  beforeEach(inject(function (_angularNagu_) {
    angularNagu = _angularNagu_;
  }));

  it('should do something', function () {
    expect(!!angularNagu).toBe(true);
  });

});
