'use strict';

describe('Service: postdata', function () {

  // load the service's module
  beforeEach(module('rediditApp'));

  // instantiate service
  var postdata;
  beforeEach(inject(function (_postdata_) {
    postdata = _postdata_;
  }));

  it('should do something', function () {
    expect(!!postdata).toBe(true);
  });

});
