define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone'),
    Dashboard = require('app/views/dashboard/dashboard'),
    FriendsIndex = require('app/views/friendships/index');

  return Backbone.Router.extend({
    initialize: function (options) {
      this.$rootEl = options.$rootEl;
    },

    routes: {
      "": "dashboard",
      "friends": "friends_index"
    },

    friends_index: function () {
      var view = new FriendsIndex();
      this._swapView(view);
    },

    dashboard: function () {
      var view = new Dashboard();
      this._swapView(view);
    },

    _swapView: function (view) {
      this.currentView && this.currentView.remove();
      this.currentView = view;
      this.$rootEl.html(view.render().$el);
    }
  });
});
