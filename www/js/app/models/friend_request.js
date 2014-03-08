define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
      UserModel = require('app/models/user');

  return Backbone.Model.extend({
    parse: function (response) {
      if (response.sender) {
        this.sender().set(response.sender);
        delete response.sender;
      }

      return response;
    },

    sender: function () {
      if (!this._sender) {
        this._sender = new UserModel();
      }

      return this._sender;
    },

    accept: function (callback) {
      var that = this;

      $.ajax({
        url: '/friend_requests/' + this.id + '/accept',
        type: 'POST',
        success: function (resp) {
          var friendship = new FriendshipModel(resp, {parse: true});
          that.collection.remove(that);
          callback(friendship);
        }
      });
    },

    deny: function (callback) {
      var that = this;

      $.ajax({
        url: '/friend_requests/' + this.id + '/accept',
        type: 'DELETE',
        success: function (resp) {
          that.collection.remove(that);
          callback();
        }
      });
    }
  });
});
