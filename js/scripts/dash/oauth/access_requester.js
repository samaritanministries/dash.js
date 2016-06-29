namespace('Dash.OAuth');

(function(Storage, Browser) {
  'use strict';

Dash.OAuth.AccessRequester = function(urlGenerator) {
  var FIVE_MINUTES_IN_SECONDS = 300;
  this.urlGenerator = urlGenerator;

  this.requestAccess = function() {
    var urlAndState = this.urlGenerator.generate();
    this.storeState(urlAndState.state);
    this.sendRequest(urlAndState.url);
  };

  this.storeState = function (state) {
    Storage.set(Storage.names.state, state, {expires: FIVE_MINUTES_IN_SECONDS});
  };

  this.sendRequest = function(url) {
    Browser.Location.change(url);
  };
};

}(Dash.OAuth.Storage, Dash.Browser));
