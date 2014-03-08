define(function (require) {
  "use strict";

  var Backbone = require('Backbone'),
      MessagesCollection = require('app/collections/messages')
      UserModel = require('app/models/user');

  return Backbone.Model.extend({
    parse: function (response) {
      if (response.friend) {
        this.friend().set(response.friend);
        delete response.friend;
      }

      if (response.messages) {
        this.messages().set(response.messages);
        this.messages()._friend_id = response.friend_id;
        delete response.messages;
      }

      return response;
    },

    friend: function () {
      if (!this._friend) {
        this._friend = new UserModel();
      }

      return this._friend;
    },

    messages: function () {
      if (!this._messages) {
        this._messages = new MessagesCollection();
      }

      return this._messages;
    };
  });
});
