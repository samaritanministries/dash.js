describe("Config", function() {
  it("contains all required urls", function() {
    var requiredUrls = ['authorization', 'tokenConfirmation', 'identityLogOff', 'authorizationLogOff'];
    $.each(requiredUrls, function(urlIndex, url) {
      expect(Config.Endpoints[url]).toBeDefined();
    });
  });

});

