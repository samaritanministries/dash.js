namespace('Dash.OAuth');

(function(Storage) {
  'use strict';

  Dash.OAuth.TokenValidator = function(state, token, expiresIn) {
    this.expiration = expiresIn;
    this.state = state;
    this.token = token;

    this.isValidState = function(state) {
      return Storage.get(Storage.names.state) === this.state;
    };

    this.storeToken = function () {
      return Storage.set(Storage.names.token, this.token, {expires: this.expiration});
    };

    this.removeToken = function() {
      return Storage.expire(Storage.names.token);
    };

    this.storedToken = function() {
      return Storage.get(Storage.names.token);
    };

    this.hasStoredToken = function() {
      return Storage.get(Storage.names.token) !== undefined;
    };
  };

}(Dash.OAuth.Storage));
