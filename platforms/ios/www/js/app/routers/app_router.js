define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone'),
    FriendsIndex = require('app/views/friendships/index');

  return Backbone.Router.extend({
    initialize: function (options) {
      this.$rootEl = options.$rootEl;
    },

    routes: {
      "" : "root",
      "friends" : "friends_index"
    },

    friends_index: function () {
      var view = new FriendsIndex();
      this._swapView(view);
    },

    root: function () {
    },

    _swapView: function (view) {
      this.currentView && this.currentView.remove();
      this.currentView = view;
      this.$rootEl.html(view.render().$el);
    }
  });
});
