namespace('Dash.OAuth');

(function() {
  'use strict';

  Dash.OAuth.Response = function(locationHash) {
    this.normalizedLocationHash = function(locationHash) {
      var parts;
      parts = locationHash.split('#');
      if (parts.length === 2) {
        return "?" + this.removeLeadingSlash(parts[1]);
      } else if (parts.length === 3) {
        return "?" + this.removeLeadingSlash(parts[2]);
      }
    };
    
    this.removeLeadingSlash = function(queryParams) {
        if (queryParams.startsWith("/")) return  queryParams.substr(1,queryParams.length);
        return queryParams;
    }

    this.params = new Dash.OAuth.Params(this.normalizedLocationHash(locationHash));

    this.token = function() {
      return this.params.get('access_token');
    };

    this.context = function() {
      return this.params.get('context');
    };

    this.expiresIn = function() {
      return this.params.get('expires_in');
    };

    this.isValidState = function() {
      var expiresIn, state, tokenValidator;
      state = this.params.get('state');
      expiresIn = this.params.get('expires_in');
      tokenValidator = new Dash.OAuth.TokenValidator(state, this.token(), expiresIn);
      return tokenValidator.isValidState();
    };

  };

}());
