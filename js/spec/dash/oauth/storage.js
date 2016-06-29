describe('Dash.OAuth.Storage', function () {
  var Storage = Dash.OAuth.Storage;

  it('sets cookies when cookies are enabled', function () {
    spyOn(Dash.OAuth.Cookie, 'isEnabled').andReturn(true);
    var spy = spyOn(Dash.OAuth.Cookie, 'set');

    Storage.set('chocolate', 'chip', {expires: 1});

    expect(spy).toHaveBeenCalledWith('chocolate', 'chip', {expires: 1});
  });

  it('sets local storage when cookies are disabled', function() {
    spyOn(Dash.OAuth.Cookie, 'isEnabled').andReturn(false);
    var spy = spyOn(Dash.OAuth.LocalStorage, 'set');

    Storage.set('two-car', 'garage', {expires: 1});

    expect(spy).toHaveBeenCalledWith('two-car', 'garage', {expires: 1});
  });

  it('gets cookies when cookies are enabled', function () {
    spyOn(Dash.OAuth.Cookie, 'isEnabled').andReturn(true);
    spyOn(Dash.OAuth.Cookie, 'get').andReturn('chip');

    var result = Storage.get('chocolate');

    expect(result).toEqual('chip');
  });

  it('gets local storage when cookies are disabled', function() {
    spyOn(Dash.OAuth.Cookie, 'isEnabled').andReturn(false);
    spyOn(Dash.OAuth.LocalStorage, 'get').andReturn('garage');

    var result = Storage.get('two-car');

    expect(result).toEqual('garage');
  });


  it('expires cookies when cookies are enabled', function () {
    spyOn(Dash.OAuth.Cookie, 'isEnabled').andReturn(true);
    var spy = spyOn(Dash.OAuth.Cookie, 'expire');

    Storage.expire('chocolate');

    expect(spy).toHaveBeenCalledWith('chocolate');
  });

  it('expires local storage when cookies are disabled', function() {
    spyOn(Dash.OAuth.Cookie, 'isEnabled').andReturn(false);
    var spy = spyOn(Dash.OAuth.LocalStorage, 'expire');

    Storage.expire('two-car');

    expect(spy).toHaveBeenCalledWith('two-car');
  });
});
