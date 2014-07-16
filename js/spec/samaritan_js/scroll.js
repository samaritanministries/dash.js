describe("Scroll", function() {
  var createUrlGenerator = function(options) {
    return new SamaritanJs.OAuth.UrlGenerator(options);
  }

  it("scrolls to an element", function() {
    setFixtures('<div id="the-div"></div>');
    spyOn(Browser, 'scrollTo');
    var topOffset = $('#the-div').offset().top;
    var padding = 12;
    var url = 'http://example.com';
    SamaritanJs.Scroll.toElement('#the-div', url, padding);
    expect(Browser.scrollTo).toHaveBeenCalledWith(0, topOffset - padding, url);
  });

  describe("#registerFixedElements", function() {
    it("adjusts the positions of elements", function() {
      setFixtures('<div id="the-div"><div id="the-el" style="position:fixed;"></div></div>');
      var done = false;
      var offset = 20;
      var platformOffset = 123;
      SamaritanJs.Scroll.registerFixedElements('#the-el', offset, window.location.origin);

      Browser.postMessage("fixedPositionOffset:" + platformOffset, '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect($('#the-el').offset().top).toEqual(offset + platformOffset);
      });
      setTimeout(function(){ done = true; }, 1);
    });

    it("returns a callback function to deregister the event listener", function() {
      setFixtures('<div id="the-div"><div id="the-second-el" style="position:fixed;"></div></div>');
      var done = false;
      var originalOffset = $('#the-second-el').offset().top;
      var callback = SamaritanJs.Scroll.registerFixedElements('#the-second-el', 20, window.location.origin);
      callback();

      Browser.postMessage("fixedPositionOffset:123", '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect($('#the-second-el').offset().top).toEqual(originalOffset);
      });
      setTimeout(function(){ done = true; }, 1);
    });

    it("only accepts messages from the given url", function() {
      setFixtures('<div id="the-div"><div id="the-third-el" style="position:fixed;"></div></div>');
      var done = false;
      var originalOffset = $('#the-third-el').offset().top;
      var callback = SamaritanJs.Scroll.registerFixedElements('#the-third-el', 20, 'https://example.com');

      Browser.postMessage("fixedPositionOffset:123", '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect($('#the-third-el').offset().top).toEqual(originalOffset);
      });
      setTimeout(function(){ done = true; }, 1);
    });
  });

  describe("#registerInfiniteScroll in an iframe", function() {
    beforeEach(function() {
      spyOn(Browser, 'isInIframe').andReturn(true);
    });

    it("doesn't call the callback function when not scrolled to the bottom of the element", function() {
      setFixtures('<div id="the-div"><div id="the-el" style="height:3000px;"></div></div>');
      var done = false;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback, window.location.origin);

      message = {
        type: 'infiniteScroll',
        windowHeight: 100,
        windowScrollTop: 0,
        iframeOffsetTop: 0
      }
      Browser.postMessage(JSON.stringify(message), '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect(callback).not.toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 1);
    });

    it("calls the callback function when scrolled to the bottom of the element", function() {
      setFixtures('<div id="the-div"><div id="the-el" style="height:3000px;"></div></div>');
      var done = false;
      var windowHeight = $('#the-el').height();
      var windowScrollTop = $('#the-el').offset().top;
      var iframeOffsetTop = 0;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback, window.location.origin);

      message = {
        type: 'infiniteScroll',
        windowHeight: windowHeight,
        windowScrollTop: windowScrollTop,
        iframeOffsetTop: iframeOffsetTop
      }
      Browser.postMessage(JSON.stringify(message), '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect(callback).toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 1);
    });

    it("only calls the callback function once when scrolled to the bottom of the element", function() {
      setFixtures('<div id="the-div"><div id="the-el" style="height:3000px;"></div></div>');
      var done = false;
      var windowHeight = $('#the-el').height();
      var windowScrollTop = $('#the-el').offset().top;
      var iframeOffsetTop = 0;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback, window.location.origin);

      message = {
        type: 'infiniteScroll',
        windowHeight: windowHeight,
        windowScrollTop: windowScrollTop,
        iframeOffsetTop: iframeOffsetTop
      }
      Browser.postMessage(JSON.stringify(message), '*');
      Browser.postMessage(JSON.stringify(message), '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect(callback.calls.length).toEqual(1);
      });
      setTimeout(function(){ done = true; }, 1);
    });

    it("returns a callback function to deregister the event listener", function() {
      setFixtures('<div id="the-div"><div id="the-el" style="height:3000px;"></div></div>');
      var done = false;
      var windowHeight = $('#the-el').height();
      var windowScrollTop = $('#the-el').offset().top;
      var iframeOffsetTop = 0;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      var cancelCallback = SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback, window.location.origin);
      cancelCallback();

      message = {
        type: 'infiniteScroll',
        windowHeight: windowHeight,
        windowScrollTop: windowScrollTop,
        iframeOffsetTop: iframeOffsetTop
      }
      Browser.postMessage(JSON.stringify(message), '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect(callback).not.toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 1);
    });

    it("only accepts messages from the given url", function() {
      setFixtures('<div id="the-div"><div id="the-el" style="height:3000px;"></div></div>');
      var done = false;
      var windowHeight = $('#the-el').height();
      var windowScrollTop = $('#the-el').offset().top;
      var iframeOffsetTop = 0;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback, 'http://example.com');

      message = {
        type: 'infiniteScroll',
        windowHeight: windowHeight,
        windowScrollTop: windowScrollTop,
        iframeOffsetTop: iframeOffsetTop
      }
      Browser.postMessage(JSON.stringify(message), '*');
      waitsFor(function(){ return done; }, '', 3);

      runs(function(){
        expect(callback).not.toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 1);
    });
  });

  describe("#registerInfiniteScroll not in an iframe", function() {
    beforeEach(function() {
      spyOn(Browser, 'isInIframe').andReturn(false);
      setFixtures('<div id="the-div"><div id="the-el"></div><div id="other"></div></div>');
      $('#the-el').css('height', 5 * $(window).height());
      $('#other').css('height', 5 * $(window).height());
    });

    it("doesn't call the callback function when not scrolled to the bottom of the element", function() {
      var done = false;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback);

      $(window).scroll();
      waitsFor(function(){ return done; }, '', 40);

      runs(function(){
        expect(callback).not.toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 30);
    });

    it("calls the callback function when scrolled to the bottom of the element", function() {
      var done = false;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback);

      var el = $('#the-el');
      window.scrollTo(0, $(document).height());
      waitsFor(function(){ return done; }, '', 40);

      runs(function(){
        expect(callback).toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 30);
    });

    it("only calls the callback function once when scrolled to the bottom of the element", function() {
      var done = false;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback);

      var el = $('#the-el');
      window.scrollTo(0, $(document).height());
      $(window).scroll();
      waitsFor(function(){ return done; }, '', 40);

      runs(function(){
        expect(callback.calls.length).toEqual(1);
      });
      setTimeout(function(){ done = true; }, 30);
    });

    it("returns a callback function to deregister the event listener", function() {
      var done = false;
      var callback = jasmine.createSpy('infiniteScrollCallback');
      var removeCallback = SamaritanJs.Scroll.registerInfiniteScroll('#the-el', callback);
      removeCallback();

      var el = $('#the-el');
      window.scrollTo(0, $(document).height());
      waitsFor(function(){ return done; }, '', 40);

      runs(function(){
        expect(callback).not.toHaveBeenCalled();
      });
      setTimeout(function(){ done = true; }, 30);
    });
  });
});
