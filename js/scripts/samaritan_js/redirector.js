namespace('SamaritanJs');

(function (TokenAccessor, Browser) {
  'use strict';

  SamaritanJs.Redirector = function (redirectUrl) {
    this.redirectUrl = redirectUrl;

    this.register = function() {
      TokenAccessor.set('redirect-url', this.redirectUrl)
    };

    this.redirect = function() {
      var url = this.savedRedirectUrl();
      if (url !== undefined) {
        Browser.changeHref(url);
        this.clearUrl();
      }
    };

    this.savedRedirectUrl = function() {
      return TokenAccessor.get('redirect-url')
    };

    this.clearUrl = function() {
      TokenAccessor.expire('redirect-url')
    };
  };

}(SamaritanJs.OAuth.TokenAccessor, Browser.Location));
