describe("Dash.Browser", function() {
  it("returns the browser type as a string", function() {
    expect(Dash.Browser.Navigator.userAgent()).toEqual(jasmine.any(String));
  });
});
