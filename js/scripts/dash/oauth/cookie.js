namespace('Dash.OAuth');

(function(Cookies) {
  'use strict';

  Dash.OAuth.Cookie = {
    set: function (key, value, options) {
      Cookies.set(key, value, options);
    },

    get: function(key) {
      return Cookies.get(key);
    },

    expire: function(key) {
      Cookies.expire(key);
    },

    isEnabled: function() {
      return Cookies.enabled;
    }
  };

}(Cookies));
