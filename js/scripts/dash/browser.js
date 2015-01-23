namespace('Dash.Browser');

(function() {
  'use strict';

  Dash.Browser.Location = {
    change: function(url) {
      window.location.replace(url);
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

  Dash.Browser.close = function() {
    window.close();
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

  Dash.Browser.isIFramedBy = function(origin) {
    if (Dash.Browser.isInIframe()) {
      return window.top.location.origin === origin;
    }
  };

  Dash.Browser.scrollToTop = function() {
    window.parent.postMessage('scrollTo:0', window.location.origin)
  };

  Dash.Browser.scrollToBottom = function() {
    window.scrollTo(0,document.body.scrollHeight);
  };

}
());
