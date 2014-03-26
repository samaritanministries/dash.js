namespace('SamaritanJs.OAuth');

(function() {
  'use strict';

  SamaritanJs.OAuth.TokenRefreshIframe = function(url) {
    this.modalDataId = 'refresh-modal';
    this.$el        = $('<iframe data-id="' + this.modalDataId + '" src="' + url + '"></iframe>');

    this.render = function() {
      this.$el.hide();
      $('body').append(this.$el);
    };

    this.remove = function() {
      this.$el.remove();
    };
  };
}());
