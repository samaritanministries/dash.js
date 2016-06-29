namespace('Dash.OAuth');

(function() {
  'use strict';

  Dash.OAuth.Storage = {
    names: {
      redirect: 'DashOAuthRedirect',
      state:    'DashOAuthState',
      token:    'DashOAuthToken'
    },

    set: function(key, value, options) {
      if (Dash.OAuth.Cookie.isEnabled()) {
        Dash.OAuth.Cookie.set(key, value, options);
      } else {
        Dash.OAuth.LocalStorage.set(key, value, options);
      }
    },

    get: function(key) {
      if (Dash.OAuth.Cookie.isEnabled()) {
        return Dash.OAuth.Cookie.get(key);
      } else {
        return Dash.OAuth.LocalStorage.get(key);
      }
    },

    expire: function(key) {
      if (Dash.OAuth.Cookie.isEnabled()) {
        Dash.OAuth.Cookie.expire(key);
      } else {
        Dash.OAuth.LocalStorage.expire(key);
      }
    }
  };
}());
