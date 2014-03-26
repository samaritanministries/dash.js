describe("Making a call for oauth access", function() {
  var Cookie = SamaritanJs.OAuth.Cookie;
  var Location = Browser.Location;
  var createAccessRequester = function(urlGenerator) {
    return new SamaritanJs.OAuth.AccessRequester(urlGenerator);
  }

  beforeEach(function () {
    Cookie.expire(Cookie.names.state);
  });

  it("stores the state the generator owns", function() {
    var uuid = '1hfysd7h3365jws98';
    var mockUrlGenerator = {state: uuid};
    var requester = createAccessRequester(mockUrlGenerator);

    requester.storeState();

    expect(Cookie.get(Cookie.names.state)).toBe(uuid);
  });

  it("sets the expiration of the cookie to 5 minutes", function() {
    var uuid = '1hfysd7h3365jws98';
    var mockUrlGenerator = {state: uuid};
    var requester = createAccessRequester(mockUrlGenerator);
    var cookieSpy = spyOn(Cookie, 'set');

    requester.storeState();

    expect(cookieSpy).toHaveBeenCalledWith(Cookie.names.state, uuid, {expires: 300});
  });

  it("requestAccess makes a request with a built url", function() {
    var uuid = '1hfysd7h3365jws98';
    var mockUrlGenerator = {
      state: uuid,
      generate: function(){return '/redirect'}
    };

    var requester = createAccessRequester(mockUrlGenerator);

    var requestSpy = spyOn(Location, 'change');

    requester.requestAccess();

    expect(Cookie.get(Cookie.names.state)).toBe(uuid);
    expect(requestSpy).toHaveBeenCalledWith('/redirect');
  });
});
