namespace('SamaritanJs.OAuth');

(function(Cookie) {
  'use strict';

  SamaritanJs.OAuth.TokenValidator = function(state, token, expiresIn) {
    this.expiration = expiresIn;
    this.state = state;
    this.token = token;

    this.isValidState = function(state) {
      return Cookie.get(Cookie.names.state) === this.state;
    };

    this.storeToken = function () {
      return Cookie.set(Cookie.names.token, this.token, {expires: this.expiration});
    };

    this.removeToken = function() {
      return Cookie.expire(Cookie.names.token);
    };

    this.storedToken = function() {
      return Cookie.get(Cookie.names.token);
    };

    this.hasStoredToken = function() {
      return Cookie.get(Cookie.names.token) !== undefined;
    };
  };

}(SamaritanJs.OAuth.Cookie));
