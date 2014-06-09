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
    Browser.scrollTo(0, url, pixelsFromTop);
  };

}());
