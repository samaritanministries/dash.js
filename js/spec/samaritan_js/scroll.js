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

  it("adjusts the positions of elements with registerFixedElements", function() {
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
