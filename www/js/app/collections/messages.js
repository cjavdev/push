/*global define */
define(['backbone', 'app/models/message'],
  function (Backbone, MessageModel) {
  "use strict";

  return Backbone.Collection.extend({
    url: function () {
      return '/friends/' + this._friend_id + '/messages';
    },

    model: MessageModel
  });
});
