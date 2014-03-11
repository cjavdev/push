/*global define */
define(['jquery',
        'backbone',
        'app/models/friendship',
        'app/models/user',
        'require'],
  function ($, Backbone, FriendshipModel, UserModel, require) {
  "use strict";

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
        UserModel = require('app/models/user');
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
          var friendship = new FriendshipModel(resp, {
            parse: true
          });
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
        success: function () {
          that.collection.remove(that);
          callback();
        }
      });
    }
  });
});
