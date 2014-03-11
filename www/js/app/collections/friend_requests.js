/*global define */
define(['backbone', 'app/models/friend_request'],
  function (Backbone, FriendRequestModel) {
  "use strict";

  return Backbone.Collection.extend({
    url: '/friend_requests',
    model: FriendRequestModel
  });
});
