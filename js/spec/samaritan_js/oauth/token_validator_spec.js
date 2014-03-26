describe("Validating a token", function() {
  var Cookie = SamaritanJs.OAuth.Cookie;
  var createTokenValidator = function(state, token, expiration) {
    return new SamaritanJs.OAuth.TokenValidator(state, token, expiration);
  }

  beforeEach(function() {
    Cookie.expire(Cookie.names.token);
    Cookie.expire(Cookie.names.state);
  });

  it("identifies undefined state as invalid", function() {
    var validator = createTokenValidator('state', 'token');
    expect(validator.isValidState()).toEqual(false);
  });

  it("stores a token", function() {
    var state = 's8dfhhh766g35sf09';
    var token = 'xkjbkxjcbxckb2452';
    var expiration = 3600;
    var validator = createTokenValidator(state, token, expiration);
    var cookieSpy = spyOn(Cookie, 'set');

    validator.storeToken()

    expect(cookieSpy).toHaveBeenCalledWith(Cookie.names.token, token, {expires: expiration});
  });

  it("removes a token", function() {
    var state = 's8dfhhh766g35sf09';
    var token = 'xkjbkxjcbxckb2452';
    var expiration = 3600;
    var validator = createTokenValidator(state, token, expiration);
    validator.storeToken()
    expect(validator.storedToken()).toEqual(token)

    validator.removeToken();
    expect(validator.storedToken()).toBeUndefined()
  });

  it("returns false when state doesn't match", function() {
    Cookie.set(Cookie.names.state, "11235813");
    var validator = createTokenValidator('aabbcdedf', "");

    expect(validator.isValidState()).toEqual(false);
  });

  it("gets a stored token", function() {
    var token = 'xkjbkxjcbxckb2452';
    var validator = createTokenValidator('', token);

    validator.storeToken();

    expect(validator.hasStoredToken()).toEqual(true);
    expect(validator.storedToken()).toEqual(token);
  });

  it("has no stored token", function() {
    var validator = createTokenValidator('', '');

    expect(validator.hasStoredToken()).toEqual(false);
    expect(validator.storedToken()).toBeUndefined();
  });

});
