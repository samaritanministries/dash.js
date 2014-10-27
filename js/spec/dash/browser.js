describe("Dash.Browser", function() {

  it("returns the browser type as a string", function() {
    expect(Dash.Browser.Navigator.userAgent()).toEqual(jasmine.any(String));
  });

  it("returns false when browser location does not include platform pathname", function() {
    expect(Dash.Browser.Location.isIFramedBy('https://someurl.org/')).toBeFalsy();
  });

  it("returns true when browser location is in dev environment", function() {
    expect(Dash.Browser.Location.isIFramedBy('https://localhost')).toBeTruthy();
  });

});
