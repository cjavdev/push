define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Account = require('app/views/account/account'),
    Backbone = require('backbone'),
    Dashboard = require('app/views/dashboard/dashboard'),
    Footer = require('app/views/shared/footer'),
    FriendsIndex = require('app/views/friends/index'),
    Header = require('app/views/shared/header');

  return Backbone.Router.extend({
    routes: {
      "": "dashboard",
      "account": "account",
      "dashboard": "dashboard",
      "friends": "friends_index"
    },

    initialize: function (options) {
      this.$rootEl = options.$rootEl;
      this.$footerEl = options.$footerEl;
      this.$headerEl = options.$headerEl;

      this._installHeadAndFoot();
    },

    account: function () {
      var view = new Account();
      this._swapView(view);
    },

    currentRoute: function () {
      return this.routes[Backbone.history.fragment];
    },

    dashboard: function () {
      var view = new Dashboard();
      this._swapView(view);
    },

    friends_index: function () {
      var view = new FriendsIndex();
      this._swapView(view);
    },

    _installHeadAndFoot: function () {
      var footer = new Footer({ router: this });
      var header = new Header({ router: this });

      this.$footerEl.html(footer.render().$el);
      this.$headerEl.html(header.render().$el);
    },

    _swapView: function (view) {
      this.currentView && this.currentView.remove();
      this.currentView = view;
      this.$rootEl.html(view.render().$el);
    }
  });
});
