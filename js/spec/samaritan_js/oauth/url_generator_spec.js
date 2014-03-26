describe("Generating an OAuth Url", function() {
  var createUrlGenerator = function(options) {
    return new SamaritanJs.OAuth.UrlGenerator(options);
  }

  it("has a base url", function() {
    var urlGenerator = createUrlGenerator({baseUrl: 'https://accounts.google.com/o/oauth2/auth'});
    expect(urlGenerator.baseUrl).toBe('https://accounts.google.com/o/oauth2/auth');
  });

  it("has a clientId", function() {
    var urlGenerator = createUrlGenerator({clientId: 'sampleClientId'});

    expect(urlGenerator.clientId).toBe('sampleClientId');
  });

  it("has a context", function() {
    var urlGenerator = createUrlGenerator({context: '11234'});
    expect(urlGenerator.context).toBe('11234');
  });

  it("has a redirect url", function() {
    var urlGenerator = createUrlGenerator({redirectUrl: 'test'});
    expect(urlGenerator.redirectUrl).toBe('test');
  });

  it("has a response type", function() {
    var urlGenerator = createUrlGenerator({responseType: 'token'});

    expect(urlGenerator.responseType).toBe('token');
  });

  it("has scopes", function() {
    var urlGenerator = createUrlGenerator({scopes: ['test-scope']});

    expect(urlGenerator.scopes).toEqual(['test-scope']);
  });

  it("has a state to protect from cross-site attacks", function() {
    var urlGenerator = createUrlGenerator({});

    expect(urlGenerator.state).not.toBeUndefined();
    expect(urlGenerator.state.length).toBe(36);
  });

  it("creates a query url with the data", function() {
    var scopes = ['identity', 'profile', 'needs', 'membership'];
    var encodedScopes = 'identity profile needs membership'
    var urlGenerator = createUrlGenerator({baseUrl: 'https://example.com', redirectUrl: 'https://example.com/1', scopes: scopes, clientId: '123', responseType: 'token', context: "12344"});

    var encodedRedirectUrl = encodeURI(urlGenerator.redirectUrl);
    var params = jQuery.param({scope: encodedScopes, state: urlGenerator.state, redirect_uri: encodedRedirectUrl, client_id: urlGenerator.clientId, response_type: urlGenerator.responseType, context: "12344"});

    var generatedUrl = urlGenerator.baseUrl + "?" + params;

    expect(urlGenerator.generate()).toBe(generatedUrl);
  });

});
