describe("Validating a token", function() {

  beforeEach(function() {
    SmchcnOAuth.Cookie.expire('smchcnOAuthToken');
  });

  it("identifies undefined state as invalid", function() {
    var validator = new SmchcnOAuth.TokenValidator('state', 'token');
    expect(validator.isValidState()).toEqual(false);
  });

  it("stores a token", function() {
    var state = 's8dfhhh766g35sf09';
    var token = 'xkjbkxjcbxckb2452';
    var expiration = 3600;
    var validator = new SmchcnOAuth.TokenValidator(state, token, expiration);
    var cookieSpy = spyOn(SmchcnOAuth.Cookie, 'set');

    validator.storeToken()

    expect(cookieSpy).toHaveBeenCalledWith('smchcnOAuthToken', token, {expires: expiration});
  });

  it("removes a token", function() {
    var state = 's8dfhhh766g35sf09';
    var token = 'xkjbkxjcbxckb2452';
    var expiration = 3600;
    var validator = new SmchcnOAuth.TokenValidator(state, token, expiration);
    validator.storeToken()
    expect(validator.storedToken()).toEqual(token)

    validator.removeToken();
    expect(validator.storedToken()).toBeUndefined()
  });

  it("returns false when state doesn't match", function() {
    SmchcnOAuth.Cookie.set('smchcnOAuthState', "11235813");
    var validator = new SmchcnOAuth.TokenValidator('aabbcdedf', "");

    expect(validator.isValidState()).toEqual(false);
  });

  it("gets a stored token", function() {
    var token = 'xkjbkxjcbxckb2452';
    var validator = new SmchcnOAuth.TokenValidator('', token);

    validator.storeToken();

    expect(validator.hasStoredToken()).toEqual(true);
    expect(validator.storedToken()).toEqual(token);
  });

  it("has no stored token", function() {
    var validator = new SmchcnOAuth.TokenValidator('', '');

    expect(validator.hasStoredToken()).toEqual(false);
    expect(validator.storedToken()).toBeUndefined();
  });

});
