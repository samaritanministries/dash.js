describe("Dash.Browser", function() {

  it("returns the browser type as a string", function() {
    expect(Dash.Browser.Navigator.userAgent()).toEqual(jasmine.any(String));
  });

  it("returns false when browser location does not match the passed in url", function() {
    expect(Dash.Browser.Location.isIFramedBy('https://someurl.org/')).toBeFalsy();
  });

});
