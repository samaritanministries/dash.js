namespace('Dash.OAuth');

(function() {
  'use strict';

  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Dash.OAuth.AutoRefresh = (function() {
    function AutoRefresh(appId, urlGenerator, shouldShowCallback) {
      this.appId = appId;
      this.urlGenerator = urlGenerator;
      this.shouldShowCallback = shouldShowCallback;
      this.refreshLocation = __bind(this.refreshLocation, this);
    }

    AutoRefresh.prototype.modalDataId = 'refresh-modal';

    AutoRefresh.prototype.checkForTokenInterval = 200;
    AutoRefresh.prototype.maxWaitForToken = 6000;

    AutoRefresh.prototype.register = function() {
      var timeInSeconds, timeoutInMilliseconds,
        _this = this;
      timeInSeconds = Dash.OAuth.TokenAccessor.getExpiresIn(this.appId);
      timeoutInMilliseconds = timeInSeconds * 1000;
      return this.timeoutId = Dash.Browser.setTimeout((function() {
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
      Dash.OAuth.TokenAccessor.expire(this.appId);
      Dash.OAuth.Cookie.set('isAutoRefresh', 'true', 10);
      var urlAndState = this.urlGenerator.generate();
      (new Dash.OAuth.AccessRequester()).storeState(urlAndState.state);
      this.modal = this.createModal(urlAndState.url);
      this.modal.render();
      this.refreshPageTimeoutId = Dash.Browser.setTimeout(function(){_this.refreshLocation(urlAndState.url)}, this.maxWaitForToken);
      return this.intervalId = Dash.Browser.setInterval((function() {
        return _this.closeModal();
      }), this.checkForTokenInterval);
    };

    AutoRefresh.prototype.createModal = function(url) {
      return new Dash.OAuth.TokenRefreshIframe(url);
    };

    AutoRefresh.prototype.refreshLocation = function(url) {
      Dash.OAuth.AutoRefresh.expireFlag();
      return Dash.Browser.Location.change(url);
    };

    AutoRefresh.prototype.closeModal = function() {
      if (Dash.OAuth.TokenAccessor.get(this.appId) != undefined) {
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
      if (this.shouldShowCallback != undefined) {
        return this.shouldShowCallback();
      } else {
        return true;
      }
    };

    AutoRefresh.expireFlag = function() {
      return Dash.OAuth.Cookie.expire('isAutoRefresh');
    };

    AutoRefresh.isFlagSet = function() {
      return (Dash.OAuth.Cookie.get('isAutoRefresh') != undefined);
    };

    return AutoRefresh;

  })();

}).call(this);
