namespace('SamaritanJs.OAuth');

(function(UUID, $) {
  'use strict';

SamaritanJs.OAuth.UrlGenerator = function(urlOptions) {
  this.baseUrl      = urlOptions.baseUrl;
  this.clientId     = urlOptions.clientId || "smi_platform";
  this.context      = urlOptions.context
  this.redirectUrl  = urlOptions.redirectUrl;
  this.responseType = urlOptions.responseType;
  this.scopes       = urlOptions.scopes || [ "identity", "needs", 'profile', "membership", "enroll"];
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
