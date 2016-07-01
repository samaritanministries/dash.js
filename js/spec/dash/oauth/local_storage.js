describe('Dash.OAuth.LocalStorage', function () {
  var LocalStorage = Dash.OAuth.LocalStorage;

  afterEach(function () {
    store.clear();
  });

  it('sets and gets objects with expiration', function () {
    LocalStorage.set('foo', 'bar', {expires: 10});

    expect(LocalStorage.get('foo')).toEqual('bar');
  });

  it('sets and gets objects without expiration', function () {
    LocalStorage.set('foo', 'bar');

    expect(LocalStorage.get('foo')).toEqual('bar');
  });

  it('removes objects', function () {
    LocalStorage.set('foo', 'bar', {expires: 10});

    LocalStorage.expire('foo');

    expect(LocalStorage.get('foo')).toBeUndefined();
  });

  describe('getting an expired object', function () {
    it('returns undefined', function () {
      LocalStorage.set('foo', 'bar', {expires: -10});

      expect(LocalStorage.get('foo')).toBeUndefined();
    });

    it('deletes the object', function () {
      LocalStorage.set('foo', 'bar', {expires: -10});

      LocalStorage.get('foo');

      expect(store.get('foo')).toBeUndefined();
    });
  });
});
