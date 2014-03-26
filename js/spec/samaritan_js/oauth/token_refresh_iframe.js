describe('SamaritanJs.OAuth.TokenRefreshIframe', function() {
  var createModal = function(url) {
    return new SamaritanJs.OAuth.TokenRefreshIframe(url);
  };

  var cleanUpModal = function(modal) {
    modal.remove();
  }

  it('opens a iframe to the given url', function() {
    var url = 'https://example.com';
    var modal = createModal(url);

    modal.render();

    expect($('iframe').attr('src')).toEqual(url)
    cleanUpModal(modal);
  });

  it('is hidden', function() {
    var modal = createModal('https://example.com');

    modal.render();
    expect(modal.$el).not.toBeVisible()
    cleanUpModal(modal);
  });

  it('removes itself', function() {
    var modal = createModal('https://example.com');

    modal.render();
    expect(modal.$el).toBeInDOM()

    modal.remove();
    expect(modal.$el).not.toBeInDOM()
    cleanUpModal(modal);
  });
});
