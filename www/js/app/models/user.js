/*global define */
define(function (require) {
  "use strict";

  var _ = require('lodash'),
    Backbone = require('backbone'),
    FriendRequestsCollection = require('app/collections/friend_requests'),
    WorkoutsCollection = require('app/collections/workouts'),
    FriendshipsCollection = require('app/collections/friendships');

  return Backbone.Model.extend({
    url: function () {
      return '/user';
    },

    login: function () {
    },

    parse: function (response) {
      if (response.friendships) {
        this.friendships().set(response.friendships, {
          parse: true
        });
        // friend
        // messages
        delete response.friendships;
      }

      if (response.workouts) {
        this.workouts().set(response.workouts, {
          parse: true
        });
        // workout sets
        delete response.workouts;
      }

      if (response.received_friend_requests) {
        this.friendRequests().set(response.received_friend_requests, {
          parse: true
        });
        // sender
        delete response.received_friend_requests;
      }


      return response;
    },

    friendships: function () {
      if (!this._friendships) {
        this._friendships = new FriendshipsCollection();
      }

      return this._friendships;
    },

    workouts: function () {
      if (!this._workouts) {
        this._friendships = new WorkoutsCollection();
      }

      return this._workouts;
    },

    friendRequests: function () {
      if (!this._friendRequests) {
        this._friendRequests = new FriendRequestsCollection();
      }

      return this._friendRequests;
    }
  });
});
