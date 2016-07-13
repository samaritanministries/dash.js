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
      Dash.OAuth.MemoryStorage.set(key, value, options);
      Dash.OAuth.Cookie.set(key, value, options);
      Dash.OAuth.LocalStorage.set(key, value, options);
    },

    get: function(key) {
      var resultValue = Dash.OAuth.MemoryStorage.get(key);
      if (resultValue == undefined) {
        return Dash.OAuth.LocalStorage.get(key);
      }
      if (resultValue == undefined) {
         resultValue = Dash.OAuth.Cookie.get(key);
      }
      return resultValue;
    },

    expire: function(key) {
      Dash.OAuth.MemoryStorage.expire(key);
      Dash.OAuth.Cookie.expire(key);
      Dash.OAuth.LocalStorage.expire(key);
    }
  };
}());
