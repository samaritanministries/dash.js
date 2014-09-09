namespace('Dash.Notify');

(function() {
  'use strict';

  Dash.Notify.loggedOut = function(appId, url) {
    Dash.Browser.notifyLoggedOut(appId, url);
  };

  Dash.Notify.doneLoading = function(appId, url) {
    Dash.Browser.notifyDoneLoading(appId, url);
  };
}());
