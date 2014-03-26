namespace('SamaritanJs.OAuth');

(function(Cookie, Browser) {
  'use strict';

SamaritanJs.OAuth.AccessRequester = function(urlGenerator) {
  var FIVE_MINUTES_IN_SECONDS = 300;
  this.urlGenerator = urlGenerator;

  this.storeState = function () {
    Cookie.set(Cookie.names.state, this.urlGenerator.state, {expires: FIVE_MINUTES_IN_SECONDS});
  };

  this.requestAccess = function() {
    this.storeState();
    this.sendRequest();
  };

  this.sendRequest = function() {
    Browser.Location.change(this.urlGenerator.generate());
  };
};

}(SamaritanJs.OAuth.Cookie, Browser));
