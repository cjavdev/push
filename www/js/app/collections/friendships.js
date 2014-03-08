define(function (require) {
  "use strict";

  var Backbone = require('Backbone'),
      FriendshipModel = require('app/models/friendship');

  return Backbone.Collection.extend({
    url: 'friendships',
    model: FriendshipModel
  });
});
