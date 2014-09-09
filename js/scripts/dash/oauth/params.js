namespace('Dash.OAuth');

(function() {
  'use strict';

  Dash.OAuth.Params = function(queryString) {

  this.queryString = queryString;

  this.queryStringToObject = function() {
    var result = {},
        keyValuePairs = this.queryString.slice(1).split('&');

    keyValuePairs.forEach(function(pair) {
      var keyValuePair = pair.split('=');
      result[keyValuePair[0]] = keyValuePair[1];
    });

    return result;
  };

  this.get = function (key) {
    return this.queryStringToObject()[key];
  };
};

}());
