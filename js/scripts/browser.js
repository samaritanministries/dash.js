namespace('Browser');

(function() {
  'use strict';

  Browser.Location = {
    change: function(url) {
      window.location.replace(url);
    },

    hash: function() {
      return window.location.hash;
    },

    reload: function() {
      window.location.reload();
    }
  };

  Browser.open = function(url, options) {
    return window.open(url, '_blank', options);
  };

  Browser.setTimeout = function(fn, timeInMilliseconds) {
    return window.setTimeout(fn, timeInMilliseconds);
  };

  Browser.setInterval = function(fn, timeInMilliseconds) {
    return window.setInterval(fn, timeInMilliseconds);
  };

  Browser.isInIframe = function() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  Browser.postMessage = function(message, origin, win) {
    if (win == null) {
      win = window;
    }
    win.postMessage(message, origin);
  };

  Browser.scrollTo = function(x, y, url) {
    if (Browser.isInIframe()) {
      window.top.postMessage("scrollTo:" + y, url || '*');
    } else {
      window.scrollTo(x, y);
    }
  };

  Browser.notifyDoneLoading = function(appId, url) {
    var message = {
      type:    "notify",
      message: "doneLoading",
      app:     appId
    };
    window.top.postMessage(JSON.stringify(message), url);
  };

  Browser.notifyLoggedOut = function(appId, url) {
    var message = {
      type:    "notify",
      message: "logout",
      app:     appId
    };
    window.top.postMessage(JSON.stringify(message), url);
  };
}());

