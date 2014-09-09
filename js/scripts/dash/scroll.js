namespace('Dash.Scroll');

(function() {
  'use strict';

  Dash.Scroll.toElement = function(element, url, padding) {
    var padding;
    if (padding == null) {
      padding = 10;
    }

    var offset = $(element).offset() || {top: 0};
    var topOffset = offset.top;
    var pixelsFromTop = topOffset - padding;
    Dash.Browser.scrollTo(0, pixelsFromTop, url);
  };

  Dash.Scroll.registerFixedElements = function(selector, offset, url) {
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

  Dash.Scroll.registerInfiniteScroll = function(selector, callback, url) {
    if (Dash.Browser.isInIframe()) {
      return Dash.Scroll.registerInfiniteScrollIframe(selector, callback, url);
    } else {
      return Dash.Scroll.registerInfiniteScrollNonIframe(selector, callback, url);
    };
  };

  Dash.Scroll.registerInfiniteScrollNonIframe = function(selector, callback, url) {
    var removeWrapper = {};
    var scrollHandler = function() {
      var bottomOfWindow = $(window).height() + $(window).scrollTop();
      var el = $(selector);
      if (el.length > 0) {
        var bottomOfEl = el.height() + el.offset().top;
        if (bottomOfWindow >= bottomOfEl) {
          callback();
          removeWrapper.removeHandler();
        };
      };
    };
    $(window).on('scroll', scrollHandler);
    var removeHandler = function() {
      $(window).off('scroll', scrollHandler);
    };
    removeWrapper.removeHandler = removeHandler;
    return removeHandler;
  };

  Dash.Scroll.registerInfiniteScrollIframe = function(selector, callback, url) {
    var removeWrapper = {};

    var shouldTriggerCallback = function(message) {
      var el = $(selector);
      var bottomOfWindow = message.windowHeight + message.windowScrollTop;
      var bottomOfEl = el.height() + el.offset().top + message.iframeOffsetTop;
      return bottomOfWindow >= bottomOfEl;
    };

    var messageHandler = function(event) {
      if (event.origin == url) {
        var message;
        try {
          message = JSON.parse(event.data);
        } catch (e) {
          return;
        }

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
