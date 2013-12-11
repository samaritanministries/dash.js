describe("SmchcnOAuth config", function() {
  it("contains all required urls", function() {
    var requiredUrls = ['authorization', 'tokenConfirmation', 'identityLogOff', 'authorizationLogOff'];
    $.each(SmchcnOAuth.Config, function(configIndex, configuration) {
      $.each(requiredUrls, function(urlIndex, url) {
        expect(configuration[url]).toBeDefined();
      });
    });
  });

});

