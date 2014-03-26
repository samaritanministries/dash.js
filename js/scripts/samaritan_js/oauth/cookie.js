namespace('SamaritanJs.OAuth');

(function(Cookies) {
  'use strict';

  SamaritanJs.OAuth.Cookie = {
    names: {
      redirect: 'SamaritanJsOAuthRedirect',
      state:    'SamaritanJsOAuthState',
      token:    'SamaritanJsOAuthToken'
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
