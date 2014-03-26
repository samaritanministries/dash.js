namespace('Config');

(function() {
  'use strict';

  Config.Endpoints = {
    authorization: "https://smchcn.net/asrv/SMI/oauth/authorize",
    tokenConfirmation: "https://smchcn.net/smiIdentity/api/tokenConfirmation",
    identityLogOff: "https://smchcn.net/smiIdentity/api/logoff",
    authorizationLogOff: "https://smchcn.net/asrv/?wa=wsignoutcleanup1.0"
  }
}());

