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
});
