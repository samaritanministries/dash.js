describe("Dash.OAuth.Params", function() {
  var createParams = function(queryString) {
    return new Dash.OAuth.Params(queryString);
  };

  it("splits out the key value pairs", function() {
    var params = createParams("?hello=world&goodbye=today");

    expect(params.get('hello')).toBe('world');
    expect(params.get('goodbye')).toBe('today');
  });

  it("empty query string", function() {
    var params = createParams("");

    expect(params.get('hello')).toBeUndefined();
  });
});
