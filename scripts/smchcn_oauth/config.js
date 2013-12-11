namespace('SmchcnOAuth');

(function() {
  'use strict';

  SmchcnOAuth.Config = {
    sandbox: {
      authorization: "https://sandbox.smchcn.net/asrv/SMI/oauth/authorize",
      tokenConfirmation: "https://sandbox.smchcn.net/smiIdentity/api/tokenConfirmation",
      identityLogOff: "https://sandbox.smchcn.net/smiIdentity/api/logoff",
      authorizationLogOff: "https://sandbox.smchcn.net/asrv/?wa=wsignoutcleanup1.0",
    },
  }
}());

