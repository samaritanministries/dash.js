namespace('Dash.OAuth');

(function(Cookies) {
  'use strict';

  Dash.OAuth.Cookie = {
    names: {
      redirect: 'DashOAuthRedirect',
      state:    'DashOAuthState',
      token:    'DashOAuthToken'
    },

    set: function (key, value, options) {
      return Cookies.set(key, value, options);
    },

    get: function(key) {
      return Cookies.get(key);
    },

    expire: function(key) {
      return Cookies.expire(key);
    }
  };

}(Cookies));
