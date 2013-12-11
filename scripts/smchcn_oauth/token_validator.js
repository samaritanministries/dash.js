namespace('SmchcnOAuth');

(function(Cookie) {
  'use strict';

  SmchcnOAuth.TokenValidator = function(state, token, expiresIn) {
    this.expiration = expiresIn;
    this.state = state;
    this.token = token;

    this.isValidState = function(state) {
      return Cookie.get('smchcnOAuthState') === this.state;
    };

    this.storeToken = function () {
      return Cookie.set('smchcnOAuthToken', this.token, {expires: this.expiration});
    };

    this.removeToken = function() {
      return Cookie.expire('smchcnOAuthToken');
    };

    this.storedToken = function() {
      return Cookie.get('smchcnOAuthToken');
    };

    this.hasStoredToken = function() {
      return Cookie.get('smchcnOAuthToken') !== undefined;
    };
  };

}(SmchcnOAuth.Cookie));
