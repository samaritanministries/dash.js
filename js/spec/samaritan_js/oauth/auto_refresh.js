(function() {
  describe('Token.AutoRefresh', function() {
    var cleanup, createAutoRefresh, findModals, profileAppId, registerApp, registerCurrentApp, tick;

    profileAppId = 'profile';
    createAutoRefresh = function(appId, urlGenerator, shouldShowCallback) {
      return new SamaritanJs.OAuth.AutoRefresh(appId, urlGenerator, shouldShowCallback);
    };
    registerApp = function(appId, urlGenerator, timeout, token, shouldShowCallback) {
      var a;

      if (token == null) {
        token = 'sfadghjfd32456trfgd';
      }
      SamaritanJs.OAuth.TokenAccessor.set(appId, token, timeout);
      a = createAutoRefresh(appId, urlGenerator, shouldShowCallback);
      a.register();
      return a;
    };
    registerCurrentApp = function(appId, urlGenerator, timeout, token) {
      if (token == null) {
        token = 'sfadghjfd32456trfgd';
      }
      return registerApp(appId, urlGenerator, timeout, token);
    };
    var createMockUrlGenerator = function(url, state) {
      return {generate: function(){return {url: url || '/redirect', state: state || 'state'}}};
    };
    findModals = function() {
      return $("[data-id=" + (new SamaritanJs.OAuth.AutoRefresh).modalDataId + "]");
    };
    tick = function(seconds) {
      return jasmine.Clock.tick(seconds * 1000);
    };
    beforeEach(function() {
      return jasmine.Clock.useMock();
    });
    cleanup = function(autoRefresh) {
      autoRefresh.cleanUp();
      return SamaritanJs.OAuth.AutoRefresh.expireFlag();
    };
    it('sets an timeout for the time in milliseconds', function() {
      var autoRefresh;

      spyOn(Browser, 'setTimeout');
      spyOn(Date, 'now').andReturn(1396443193877);
      autoRefresh = registerApp(profileAppId, createMockUrlGenerator(), '123');
      expect(Browser.setTimeout.mostRecentCall.args[1]).toEqual(123 * 1000);
      return cleanup(autoRefresh);
    });
    it('expires the token', function() {
      var autoRefresh;

      autoRefresh = registerCurrentApp(profileAppId, createMockUrlGenerator(), 1);
      tick(1);
      expect(SamaritanJs.OAuth.TokenAccessor.get(profileAppId)).toBeUndefined();
      return cleanup(autoRefresh);
    });
    it('sets a cookie to signify future request will be an autorefresh request', function() {
      var autoRefresh;

      autoRefresh = registerCurrentApp(profileAppId, createMockUrlGenerator(), 1);
      expect(SamaritanJs.OAuth.AutoRefresh.isFlagSet()).toBeFalsy();
      tick(1);
      expect(SamaritanJs.OAuth.AutoRefresh.isFlagSet()).toBeTruthy();
      return cleanup(autoRefresh);
    });
    it('sets a new state', function() {
      var autoRefresh;
      var state = 'the-state';
      var urlGenerator = createMockUrlGenerator('', state);

      autoRefresh = registerCurrentApp(profileAppId, urlGenerator, 1);
      tick(1);
      expect((new SamaritanJs.OAuth.TokenValidator(state)).isValidState()).toBeTruthy();
      return cleanup(autoRefresh);
    });
    it('opens a refresh modal with the generated url', function() {
      var url, autoRefresh, openedUrl;
      var fakeIframe = {
        render: function(){},
        remove: function(){}
      }

      spyOn(SamaritanJs.OAuth, 'TokenRefreshIframe').andReturn(fakeIframe);
      url = 'test/url';
      autoRefresh = registerCurrentApp(profileAppId, createMockUrlGenerator(url), 1);
      tick(1);
      openedUrl = SamaritanJs.OAuth.TokenRefreshIframe.mostRecentCall.args[0];
      expect(openedUrl).toEqual(url);
      return cleanup(autoRefresh);
    });
    it('is not visible', function() {
      var autoRefresh, modal;

      autoRefresh = registerCurrentApp(profileAppId, createMockUrlGenerator(), 5);
      tick(5);
      modal = findModals();
      tick(1);
      expect(modal).not.toBeVisible();
      return cleanup(autoRefresh);
    });
    it('removes the opened modal when the token is set', function() {
      var autoRefresh;

      autoRefresh = registerCurrentApp(profileAppId, createMockUrlGenerator(), 1);
      tick(1);
      expect(findModals()).toExist();
      SamaritanJs.OAuth.TokenAccessor.set(profileAppId, 'sfadghjfd32456trfgd', 1);
      tick(0.2);
      expect(findModals()).not.toExist();
      return cleanup(autoRefresh);
    });
    it('expires "isAutoRefresh" cookie and sets browser location to url after maxWaitForToken', function() {
      var autoRefresh, url;

      spyOn(Browser.Location, 'change');
      url = 'someurl';
      autoRefresh = registerCurrentApp(profileAppId, createMockUrlGenerator(url), 20);
      maxWaitInSeconds = autoRefresh.maxWaitForToken / 1000
      tick(20);
      expect(findModals()).toExist();
      expect(Browser.Location.change).not.toHaveBeenCalled();
      tick(maxWaitInSeconds);
      expect(SamaritanJs.OAuth.AutoRefresh.isFlagSet()).toBeFalsy();
      expect(Browser.Location.change).toHaveBeenCalledWith(url);
      return cleanup(autoRefresh);
    });
    it('re-registers when the modal is closed', function() {
      var autoRefresh;

      spyOn(Browser, 'setTimeout').andCallThrough();
      autoRefresh = createAutoRefresh(profileAppId, createMockUrlGenerator(), 1);
      SamaritanJs.OAuth.TokenAccessor.set(profileAppId, 'sfadghjfd32456trfgd', 1);
      autoRefresh.closeModal();
      expect(Browser.setTimeout.calls.length).toEqual(1);
      return cleanup(autoRefresh);
    });
    return it('can take a custom callback to determine if it should show', function() {
      var autoRefresh;

      var callback = function() {return false;}
      autoRefresh = registerApp(profileAppId, createMockUrlGenerator(), 1, 'token', callback);
      tick(1);
      expect(findModals()).not.toExist();
      return cleanup(autoRefresh);
    });
  });

}).call(this);
