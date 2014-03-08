/*global define */
define(function (require) {
  var Backbone = require('Backbone'),
      MessageModel = require('app/models/message');

  return Backbone.Collection.extend({
    url: function () {
      return '/friends/' + this._friend_id + '/messages';
    },

    model: MessageModel
  });
});
