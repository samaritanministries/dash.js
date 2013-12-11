namespace('SmchcnOAuth');

(function(UUID, $) {
  'use strict';

SmchcnOAuth.UrlGenerator = function(urlOptions) {
  this.baseUrl      = urlOptions.baseUrl;
  this.clientId     = urlOptions.clientId;
  this.context      = urlOptions.context
  this.redirectUrl  = urlOptions.redirectUrl;
  this.responseType = urlOptions.responseType;
  this.scopes       = urlOptions.scopes;
  this.state        = UUID.create().hex;

  this.generate = function() {
    var params = $.param({
      scope:         this.scopes.join(" "),
      state:         this.state,
      redirect_uri:  this.redirectUrl,
      client_id:     this.clientId,
      response_type: this.responseType,
      context:       this.context
    });

    return this.baseUrl + "?" + params;
  };
};

}(UUIDjs, jQuery));
