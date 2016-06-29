describe("Dash.OAuth.AccessRequester", function() {
  var Storage = Dash.OAuth.Storage;
  var Location = Dash.Browser.Location;

  var createAccessRequester = function(urlGenerator) {
    return new Dash.OAuth.AccessRequester(urlGenerator);
  };

  var createMockUrlGenerator = function() {
    return {
      generate: function() {
        return {
          url: '/redirect',
          state: 'state'
        };
      }
    };
  };

  beforeEach(function () {
    Storage.expire(Storage.names.state);
    spyOn(Location, 'change');
  });

  it("stores the generated state in a cookie for 5 minutes", function() {
    spyOn(Storage, 'set');
    var urlGenerator = createMockUrlGenerator();

    createAccessRequester(urlGenerator).requestAccess();

    expect(Storage.set).toHaveBeenCalledWith(Storage.names.state, urlGenerator.generate().state, {expires: 300});
  });

  it("makes a request with a built url", function() {
    var urlGenerator = createMockUrlGenerator();

    createAccessRequester(urlGenerator).requestAccess();

    expect(Location.change).toHaveBeenCalledWith(urlGenerator.generate().url);
    expect(Storage.get(Storage.names.state)).toBe(urlGenerator.generate().state);
  });
});
