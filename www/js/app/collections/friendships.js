/*global define */
define(['backbone', 'app/models/friendship'],
  function (Backbone, FriendshipModel) {
  "use strict";

  return Backbone.Collection.extend({
    url: 'friendships',
    model: FriendshipModel
  });
});
