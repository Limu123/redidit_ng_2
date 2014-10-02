'use strict';

describe('Service: datefactory', function () {

  // load the service's module
  beforeEach(module('rediditApp'));

  // instantiate service
  var datefactory;
  beforeEach(inject(function (_datefactory_) {
    datefactory = _datefactory_;
  }));

  it('should do something', function () {
    expect(!!datefactory).toBe(true);
  });

});
