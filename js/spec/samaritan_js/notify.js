describe("Notify", function() {
  it("sends a logged out notification to the top window", function() {
    var done = false;
    var message;
    var appId = 'test';
    window.addEventListener('message', function(event){ message = event.data;}, false);

    SamaritanJs.Notify.loggedOut(appId, window.location.origin);

    waitsFor(function(){ return done; }, '', 3);
    runs(function(){
      var parsedMessage = JSON.parse(message);
      expect(parsedMessage.type).toEqual('notify');
      expect(parsedMessage.message).toEqual('logout');
      expect(parsedMessage.app).toEqual(appId);
    });
    setTimeout(function(){ done = true; }, 1);
  });

  it("does not send a logged out notification if the url does not match", function() {
    var done = false;
    var message;
    window.addEventListener('message', function(event){ message = event.data;}, false);

    SamaritanJs.Notify.loggedOut('test', "http://badurl.com");

    waitsFor(function(){ return done; }, '', 3);
    runs(function(){
      expect(message).toBeUndefined();
    });
    setTimeout(function(){ done = true; }, 1);
  });

  it("sends a doneLoading notification to the top window", function() {
    var done = false;
    var message;
    var appId = 'test';
    window.addEventListener('message', function(event){ message = event.data;}, false);

    SamaritanJs.Notify.doneLoading(appId, window.location.origin);

    waitsFor(function(){ return done; }, '', 3);
    runs(function(){
      var parsedMessage = JSON.parse(message);
      expect(parsedMessage.type).toEqual('notify');
      expect(parsedMessage.message).toEqual('doneLoading');
      expect(parsedMessage.app).toEqual(appId);
    });
    setTimeout(function(){ done = true; }, 1);
  });

  it("does not send a doneLoading notification if the url does not match", function() {
    var done = false;
    var message;
    var appId = 'test';
    window.addEventListener('message', function(event){ message = event.data;}, false);

    SamaritanJs.Notify.doneLoading(appId, "http://badurl.com");

    waitsFor(function(){ return done; }, '', 3);
    runs(function(){
      expect(message).toBeUndefined();
    });
    setTimeout(function(){ done = true; }, 1);
  });
});
