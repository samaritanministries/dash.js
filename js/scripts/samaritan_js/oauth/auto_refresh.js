namespace('SamaritanJs.OAuth');

(function() {
  'use strict';

  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SamaritanJs.OAuth.AutoRefresh = (function() {
    function AutoRefresh(appId, url, state) {
      this.appId = appId;
      this.url = url;
      this.state = state;
      this.refreshLocation = __bind(this.refreshLocation, this);
    }

    AutoRefresh.prototype.modalDataId = 'refresh-modal';

    AutoRefresh.prototype.checkForTokenInterval = 200;

    AutoRefresh.prototype.register = function() {
      var timeInSeconds, timeoutInMilliseconds,
        _this = this;
      timeInSeconds = SamaritanJs.OAuth.TokenAccessor.getExpiresIn(this.appId);
      timeoutInMilliseconds = timeInSeconds * 1000;
      return this.timeoutId = Browser.setTimeout((function() {
        return _this.trigger();
      }), timeoutInMilliseconds);
    };

    AutoRefresh.prototype.trigger = function() {
      if (this.shouldShowModal()) {
        this.cleanUp();
        return this.renderModal();
      }
    };

    AutoRefresh.prototype.renderModal = function() {
      var _this = this;
      SamaritanJs.OAuth.TokenAccessor.expire(this.appId);
      SamaritanJs.OAuth.Cookie.set('isAutoRefresh', 'true', 10);
      (new SamaritanJs.OAuth.AccessRequester({
        state: this.state
      })).storeState();
      this.modal = this.createModal(this.url);
      this.modal.render();
      this.refreshPageTimeoutId = Browser.setTimeout(this.refreshLocation, 2000);
      return this.intervalId = Browser.setInterval((function() {
        return _this.closeModal();
      }), this.checkForTokenInterval);
    };

    AutoRefresh.prototype.createModal = function(url) {
      return new SamaritanJs.OAuth.TokenRefreshIframe(url);
    };

    AutoRefresh.prototype.refreshLocation = function() {
      SamaritanJs.OAuth.AutoRefresh.expireFlag();
      return Browser.Location.change(this.url);
    };

    AutoRefresh.prototype.closeModal = function() {
      if (SamaritanJs.OAuth.TokenAccessor.get(this.appId) != undefined) {
        this.cleanUp();
        return this.register();
      }
    };

    AutoRefresh.prototype.cleanUp = function() {
      var _ref;
      clearTimeout(this.timeoutId);
      clearTimeout(this.refreshPageTimeoutId);
      clearInterval(this.intervalId);
      return (_ref = this.modal) != null ? _ref.remove() : void 0;
    };

    AutoRefresh.prototype.shouldShowModal = function() {
      return this.appId === this.currentAppId();
    };

    AutoRefresh.prototype.currentAppId = function() {
      var _ref;
      return (_ref = Browser.Location.hash().match(/#(.*)/)) != null ? _ref[1] : void 0;
    };

    AutoRefresh.expireFlag = function() {
      return SamaritanJs.OAuth.Cookie.expire('isAutoRefresh');
    };

    AutoRefresh.isFlagSet = function() {
      return (SamaritanJs.OAuth.Cookie.get('isAutoRefresh') != undefined);
    };

    return AutoRefresh;

  })();

}).call(this);

