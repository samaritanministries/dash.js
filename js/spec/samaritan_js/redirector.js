describe("SamaritanJs.Redirector", function() {
  var createRedirector = function(_redirectUrl) {
    return new SamaritanJs.Redirector(_redirectUrl);
  }

  it("registers a redirect url", function() {
    createRedirector('test/redirect').register()

    expect(SamaritanJs.OAuth.TokenAccessor.get('redirect-url')).toEqual('test/redirect')
    SamaritanJs.OAuth.TokenAccessor.expire('redirect-url')
  });

  it("navigates to the saved url", function() {
    var changeHrefSpy = spyOn(Browser.Location, 'changeHref')
    var _r = createRedirector('test/redirect')
    _r.register()
    _r.redirect()

    expect(changeHrefSpy).toHaveBeenCalledWith('test/redirect')
  });

  it("removes the saved url after navigating", function() {
    spyOn(Browser.Location, 'changeHref')
    var _r = createRedirector('test/redirect')              
    _r.register()                                
    _r.redirect()                                

    expect(_r.savedRedirectUrl()).toBeUndefined()
  });

  it("doesnt navigate anywhere if no url is saved", function() {
    var changeHrefSpy = spyOn(Browser.Location, 'changeHref')
    var _r = createRedirector()              
    _r.register()                                
    _r.redirect()                                

    expect(changeHrefSpy).not.toHaveBeenCalled()
  });
});
