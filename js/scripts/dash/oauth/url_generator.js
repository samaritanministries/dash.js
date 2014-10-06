namespace('Dash.OAuth');

(function(UUID, $) {
  'use strict';

Dash.OAuth.UrlGenerator = function(urlOptions) {
  this.baseUrl      = urlOptions.baseUrl;
  this.clientId     = urlOptions.clientId || "smi_platform";
  this.context      = urlOptions.context;
  this.redirectUrl  = urlOptions.redirectUrl;
  this.responseType = urlOptions.responseType;
  this.scopes       = urlOptions.scopes;

  this.generate = function() {
    var state = UUID.create().hex;
    var params = $.param({
      scope:         this.scopes.join(" "),
      state:         state,
      redirect_uri:  this.redirectUrl,
      client_id:     this.clientId,
      response_type: this.responseType,
      context:       this.context
    });

    return {url: this.baseUrl + "?" + params, state: state};
  };
};

}(UUIDjs, jQuery));
