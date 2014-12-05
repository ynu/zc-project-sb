'use strict';

describe('Service: sbb', function () {

  // load the service's module
  beforeEach(module('appstoreApp'));

  // instantiate service
  var sbb;
  beforeEach(inject(function (_sbb_) {
    sbb = _sbb_;
  }));

  it('should do something', function () {
    expect(!!sbb).toBe(true);
  });

});
