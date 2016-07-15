describe('Dash.OAuth.MemoryStorage', function () {
  var Storage = Dash.OAuth.MemoryStorage;

  afterEach(function () {
  });

  it('sets and gets objects with expiration', function () {
    Storage.set('foo', 'bar', {expires: 10});

    expect(Storage.get('foo')).toEqual('bar');
  });

  it('sets and gets objects without expiration', function () {
    Storage.set('foo', 'bar');

    expect(Storage.get('foo')).toEqual('bar');
  });

  it('removes objects', function () {
    Storage.set('foo', 'bar', {expires: 10});

    Storage.expire('foo');

    expect(Storage.get('foo')).toBeUndefined();
  });

});
