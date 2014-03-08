/*global define */
define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone'),
    FriendshipModel = require('app/models/friendship'),
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
