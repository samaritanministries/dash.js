namespace('SmchcnOAuth');

(function(Cookies) {
  SmchcnOAuth.Cookie = {
    set: function (key, value) {
      return Cookies.set(key, value);
    },

    get: function(key) {
      return Cookies.get(key);
    },

    expire: function(key) {
      return Cookies.expire(key);
    }
  };

}(Cookies));
