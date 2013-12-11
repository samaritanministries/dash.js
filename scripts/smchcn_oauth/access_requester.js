namespace('SmchcnOAuth');

(function(Cookie, Location) {
  'use strict';

SmchcnOAuth.AccessRequester = function(urlGenerator) {
  var FIVE_MINUTES_IN_SECONDS = 300;
  this.urlGenerator = urlGenerator;

  this.storeState = function () {
    Cookie.set('smchcnOAuthState', this.urlGenerator.state, {expires: FIVE_MINUTES_IN_SECONDS});
  };

  this.requestAccess = function() {
    this.storeState();
    this.sendRequest();
  };

  this.sendRequest = function() {
    Location.change(this.urlGenerator.generate());
  };
};

}(SmchcnOAuth.Cookie, SmchcnOAuth.BrowserLocation));
