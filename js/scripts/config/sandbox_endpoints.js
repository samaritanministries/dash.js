namespace('Config');

(function() {
  'use strict';

  Config.Endpoints = {
    authorization: "https://sandbox.smchcn.net/asrv/SMI/oauth/authorize",
    tokenConfirmation: "https://sandbox.smchcn.net/smiIdentity/api/tokenConfirmation",
    identityLogOff: "https://sandbox.smchcn.net/smiIdentity/api/logoff",
    authorizationLogOff: "https://sandbox.smchcn.net/asrv/?wa=wsignoutcleanup1.0"
  }
}());

