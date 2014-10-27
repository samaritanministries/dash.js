namespace('Dash.Browser');

(function() {
  'use strict';

  Dash.Browser.Location = {
    change: function(url) {
      window.location.replace(url);
    },

    isIFramedBy: function(url) {
      if (url.match(/localhost/) != null) {
        return true;
      } else {
        return window.location.pathname == '/platform/';
      }
    },

    hash: function() {
      return window.location.hash;
    },

    reload: function() {
      window.location.reload();
    },

    changeHref: function(href) {
      window.location.href = href;
    }
  };

  Dash.Browser.Navigator = {
    userAgent: function() {
      return window.navigator.userAgent;
    }
  };

  Dash.Browser.changeTitle = function(title) {
    document.title = title;
  };

  Dash.Browser.open = function(url, options) {
    return window.open(url, '_blank', options);
  };

  Dash.Browser.setTimeout = function(fn, timeInMilliseconds) {
    return window.setTimeout(fn, timeInMilliseconds);
  };

  Dash.Browser.setInterval = function(fn, timeInMilliseconds) {
    return window.setInterval(fn, timeInMilliseconds);
  };

  Dash.Browser.isInIframe = function() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  Dash.Browser.postMessage = function(message, origin, win) {
    if (win == null) {
      win = window;
    }
    win.postMessage(message, origin);
  };

  Dash.Browser.scrollTo = function(x, y, url) {
    if (Dash.Browser.isInIframe()) {
      window.top.postMessage("scrollTo:" + y, url || '*');
    } else {
      window.scrollTo(x, y);
    }
  };

  Dash.Browser.notifyDoneLoading = function(appId, url) {
    var message = {
      type:    "notify",
      message: "doneLoading",
      app:     appId
    };
    window.top.postMessage(JSON.stringify(message), url);
  };

  Dash.Browser.notifyLoggedOut = function(appId, url) {
    var message = {
      type:    "notify",
      message: "logout",
      app:     appId
    };
    window.top.postMessage(JSON.stringify(message), url);
  };
}());
