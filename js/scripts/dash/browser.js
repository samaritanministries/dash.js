namespace('Dash.Browser');

(function() {
  'use strict';

  Dash.Browser.Location = {
    change: function(url) {
      window.location.replace(url);
    },

    isIFramedBy: function(url) {
      return (url.match(window.top.location.href) != null);
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

}());
