namespace('Dash.OAuth');
namespace('Dash.OAuth.MemoryStorageData');

(function() {
  'use strict';

  Dash.OAuth.MemoryStorage = {
    set: function (key, value, options) {
      Dash.OAuth.MemoryStorageData[key] = value;
    },

    get: function(key) {
     return Dash.OAuth.MemoryStorageData[key];
    },

    expire: function(key) {
      Dash.OAuth.MemoryStorageData[key] = undefined;
    }
  };
}());
