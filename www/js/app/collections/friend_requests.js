/*global define */
define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
    FriendRequestModel = require('app/models/friend_request');

  return Backbone.Collection.extend({
    url: '/friend_requests',
    model: FriendRequestModel
  });
});
