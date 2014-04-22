describe("Making a call for oauth access", function() {
  var Cookie = SamaritanJs.OAuth.Cookie;
  var Location = Browser.Location;
  var createAccessRequester = function(urlGenerator) {
    return new SamaritanJs.OAuth.AccessRequester(urlGenerator);
  };
  var createMockUrlGenerator = function() {
    return {generate: function(){return {url: '/redirect', state: 'state'}}};
  };

  beforeEach(function () {
    Cookie.expire(Cookie.names.state);
    spyOn(Location, 'change');
  });

  it("stores the generated state in a cookie for 5 minutes", function() {
    spyOn(Cookie, 'set');
    var urlGenerator = createMockUrlGenerator();

    createAccessRequester(urlGenerator).requestAccess();

    expect(Cookie.set).toHaveBeenCalledWith(Cookie.names.state, urlGenerator.generate().state, {expires: 300});
  });

  it("makes a request with a built url", function() {
    var urlGenerator = createMockUrlGenerator();

    createAccessRequester(urlGenerator).requestAccess();

    expect(Location.change).toHaveBeenCalledWith(urlGenerator.generate().url);
    expect(Cookie.get(Cookie.names.state)).toBe(urlGenerator.generate().state);
  });
});
