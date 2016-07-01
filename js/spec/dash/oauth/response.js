describe("Dash.OAuth.Response", function() {

    it('normalizes the location hash against Backbone routing convention to append a hashtag', function() {
      var locationHash, response;
      locationHash = "#/profile#access_token=my_token";
      response = new Dash.OAuth.Response(locationHash);
      return expect(response.token()).toEqual("my_token");
    });

    it('has the context parsed from the hash', function() {
      var locationHash, response;
      locationHash = "#/profile#context=123332";
      response = new Dash.OAuth.Response(locationHash);
      return expect(response.context()).toEqual("123332");
    });

    it('has the context parsed from the hash', function() {
      var locationHash, response;
      locationHash = "#/profile#expires_in=3600";
      response = new Dash.OAuth.Response(locationHash);
      return expect(response.expiresIn()).toEqual("3600");
    });

    it('knows if the state is invalid', function() {
      var locationHash, response;
      locationHash = "#/profile#access_token=my_token&state=invalid";
      response = new Dash.OAuth.Response(locationHash);
      return expect(response.isValidState()).toBeFalsy();
    });

    it('knows if the state is valid', function() {
      var access_token, locationHash, response, state;
      state = 'some-uuid';
      access_token = 'some-access-token';
      locationHash = "#/profile#state=" + state + "&access_token=" + access_token + "&expires_in=2014";
      Dash.OAuth.Storage.set('DashOAuthState', state);
      response = new Dash.OAuth.Response(locationHash);
      return expect(response.isValidState()).toBeTruthy();
    });

    it('knows if the state is valid default app', function() {
      var access_token, locationHash, response, state;
      state = 'some-uuid';
      access_token = 'some-access-token';
      locationHash = "#state=" + state + "&access_token=" + access_token + "&expires_in=2014";
      Dash.OAuth.Storage.set('DashOAuthState', state);
      response = new Dash.OAuth.Response(locationHash);
      return expect(response.isValidState()).toBeTruthy();
    });
});


