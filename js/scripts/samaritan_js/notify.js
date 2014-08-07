namespace('SamaritanJs.Notify');

(function() {
  'use strict';

  SamaritanJs.Notify.loggedOut = function(appId, url) {
    Browser.notifyLoggedOut(appId, url);
  };

  SamaritanJs.Notify.doneLoading = function(appId, url) {
    Browser.notifyDoneLoading(appId, url);
  };
}());
