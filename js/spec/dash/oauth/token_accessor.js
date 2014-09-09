describe('Dash.OAuth.TokenAccessor', function() {
  var token = '34rdfcfgtbrn89',
      appId = 'testAppId',
      TokenAccessor = Dash.OAuth.TokenAccessor,
      Cookie = Dash.OAuth.Cookie;

  it('saves a token with an appId', function() {
    TokenAccessor.set(appId, token);

    expect(TokenAccessor.get(appId)).toEqual(token);
  });

  it('is able to get the time until expiration for a token', function() {
    var expirationInSeconds = 10;

    TokenAccessor.set(appId, token, expirationInSeconds);

    expect(TokenAccessor.getExpiresIn(appId)).toBeCloseTo(expirationInSeconds, 2);
    var fourSecondsFromNow = Date.now() + 4000;
    spyOn(Date, 'now').andReturn(fourSecondsFromNow);
    expect(TokenAccessor.getExpiresIn(appId)).toBeCloseTo(expirationInSeconds - 4, 2);
  });

  it('session tokens have an infinite expiration', function() {
    TokenAccessor.set(appId, token);

    expect(TokenAccessor.getExpiresIn(appId)).toEqual(Infinity);
  });

  it('saves a token with an expiration, and prefixes the appId', function() {
    var expirationInSeconds = 10;
    var nowTime = Date.now();
    spyOn(Date, 'now').andReturn(nowTime);
    var cookieSpy = spyOn(Cookie, 'set');

    TokenAccessor.set(appId, token, expirationInSeconds);

    expect(cookieSpy).toHaveBeenCalledWith("smi-access-token:" + appId, token, {expires: expirationInSeconds});
    expect(cookieSpy).toHaveBeenCalledWith("smi-access-token-expiration:" + appId, nowTime + 10 * 1000, {expires: expirationInSeconds});
  });

  it('expires a token', function() {
    TokenAccessor.set(appId, token, '123');

    TokenAccessor.expire(appId);

    expect(TokenAccessor.get(appId)).toBeUndefined();
    expect(TokenAccessor.getExpiresIn(appId)).toEqual(Infinity);
  });

  it('expires all app tokens', function() {
    TokenAccessor.set(appId, token, 10);
    TokenAccessor.set('other', token, 10);
    TokenAccessor.set('again', token, 10);

    TokenAccessor.expireAll([appId, 'other', 'again']);

    expect(TokenAccessor.get(appId)).toBeUndefined();
    expect(TokenAccessor.get('other')).toBeUndefined();
    expect(TokenAccessor.get('again')).toBeUndefined();
    expect(TokenAccessor.getExpiresIn(appId)).toEqual(Infinity);
    expect(TokenAccessor.getExpiresIn('other')).toEqual(Infinity);
    expect(TokenAccessor.getExpiresIn('again')).toEqual(Infinity);
  });
});

