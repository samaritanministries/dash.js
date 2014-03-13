describe("accessing the params", function() {

  it("splits out the key value pairs", function() {
    var params = new SmchcnOAuth.Params("?hello=world&goodbye=today");

    expect(params.get('hello')).toBe('world');
    expect(params.get('goodbye')).toBe('today');
  });

  it("empty query string", function() {
    var params = new SmchcnOAuth.Params("");

    expect(params.get('hello')).toBeUndefined();
  });
});
