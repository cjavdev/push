define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Account = require('app/views/account/account'),
    Backbone = require('backbone'),
    Dashboard = require('app/views/dashboard/dashboard'),
    Footer = require('app/views/shared/footer'),
    FriendsShow = require('app/views/friends/show'),
    FriendsIndex = require('app/views/friends/index');

  return Backbone.Router.extend({
    routes: {
      "": "dashboard",
      "account": "account",
      "dashboard": "dashboard",
      "friends": "friends_index",
      "friends/:id": "friends_show"
    },

    initialize: function (options) {
      this.$rootEl = options.$rootEl;
      this.$footerEl = options.$footerEl;

      this._installFooter();
    },

    account: function () {
      var view = new Account();
      this._swapView(view);
    },

    currentRoute: function () {
      return Backbone.history.location.hash || "dashboard";
    },

    dashboard: function () {
      var view = new Dashboard();
      this._swapView(view);
    },

    friends_index: function () {
      var view = new FriendsIndex();
      this._swapView(view);
    },

    friends_show: function (id) {
      var view = new FriendsShow();
      this._swapView(view);
    },

    _installFooter: function () {
      var footer = new Footer({ router: this });
      this.$footerEl.html(footer.render().$el);
    },

    _swapView: function (view) {
      this.currentView && this.currentView.remove();
      this.currentView = view;
      this.$rootEl.html(view.render().$el);
    }
  });
});
