namespace('SamaritanJs.Scroll');

(function() {
  'use strict';

  SamaritanJs.Scroll.toElement = function(element, url, padding) {
    var padding;
    if (padding == null) {
      padding = 10;
    }

    var offset = $(element).offset() || {top: 0};
    var topOffset = offset.top;
    var pixelsFromTop = topOffset - padding;
    Browser.scrollTo(0, pixelsFromTop, url);
  };

  SamaritanJs.Scroll.registerFixedElements = function(selector, offset, url) {
    var messageHandler = function(event) {
      if (event.origin == url && /^fixedPositionOffset:/.test(event.data)) {
        var pixelsFromTop = parseFloat(event.data.split(':')[1]);
        $(selector).css('top', pixelsFromTop + offset);
      };
    };
    window.addEventListener('message', messageHandler, false);
    return function() {
      window.removeEventListener('message', messageHandler, false);
    };
  };

  SamaritanJs.Scroll.registerInfiniteScroll = function(selector, callback, url) {
    var removeWrapper = {};

    var shouldTriggerCallback = function(message) {
      var el = $(selector);
      var bottomOfWindow = message.windowHeight + message.windowScrollTop;
      var bottomOfEl = el.height() + el.offset().top + message.iframeOffsetTop;
      return bottomOfWindow >= bottomOfEl;
    };

    var messageHandler = function(event) {
      if (event.origin == url) {
        var message = JSON.parse(event.data);

        if (message.type == 'infiniteScroll' && shouldTriggerCallback(message)) {
          callback();
          removeWrapper.removeHandler();
        };
      };
    };
    window.addEventListener('message', messageHandler, false);
    var removeHandler = function() {
      window.removeEventListener('message', messageHandler, false);
    };
    removeWrapper.removeHandler = removeHandler;
    return removeHandler;
  };

}());
