namespace('Dash.OAuth');

(function() {
  'use strict';

  Dash.OAuth.LocalStorage = {
    set: function (key, value, options) {
      var expiresIn;
      if (options) {
         expiresIn = options.expires * 60;
      }
      store.set(key, {
        value: value,
        expiresIn: expiresIn,
        createdAt: new Date().getTime()
      });
    },

    get: function(key) {
      var info = store.get(key);
      var now = new Date().getTime();
      if (!info) {
        return undefined;
      }
      if (info.expiresIn && now - info.createdAt > info.expiresIn) {
        this.expire(key);
        return undefined;
      }
      return info.value;
    },

    expire: function(key) {
      store.remove(key);
    }
  };

}());
