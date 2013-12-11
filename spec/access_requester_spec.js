describe("Making a call for oauth access", function() {

  beforeEach(function () {
    SmchcnOAuth.Cookie.expire('state');
  });

  it("stores the state the generator owns", function() {
    var uuid = '1hfysd7h3365jws98';
    var mockUrlGenerator = {state: uuid};
    var requester = new SmchcnOAuth.AccessRequester(mockUrlGenerator);

    requester.storeState();

    expect(SmchcnOAuth.Cookie.get('smchcnOAuthState')).toBe(uuid);
  });

  it("makes a request with a built url", function() {
    var uuid = '1hfysd7h3365jws98';
    var mockUrlGenerator = {
      state: uuid,
      generate: function(){return '/redirect'}
    };

    var requester = new SmchcnOAuth.AccessRequester(mockUrlGenerator);

    var requestSpy = spyOn(SmchcnOAuth.BrowserLocation, 'change');

    requester.requestAccess();

    expect(SmchcnOAuth.Cookie.get('smchcnOAuthState')).toBe(uuid);
    expect(requestSpy).toHaveBeenCalledWith('/redirect');
  });

  it("sets the expiration of the cookie to 5 minutes", function() {
    var uuid = '1hfysd7h3365jws98';
    var mockUrlGenerator = {state: uuid};
    var requester = new SmchcnOAuth.AccessRequester(mockUrlGenerator);
    var cookieSpy = spyOn(SmchcnOAuth.Cookie, 'set');

    requester.storeState();

    expect(cookieSpy).toHaveBeenCalledWith('smchcnOAuthState', uuid, {expires: 300});
  });

});
