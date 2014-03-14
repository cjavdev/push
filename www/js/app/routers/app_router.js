/*global define, app, window */

define(function (require) {
  "use strict";

  var $ = require('jquery'),
    AccountView = require('app/views/account/account'),
    Backbone = require('backbone'),
    DashboardView = require('app/views/dashboard/dashboard'),
    DashboardLandscapeView = require('app/views/dashboard/landscape'),
    FooterView = require('app/views/shared/footer'),
    FriendsShowView = require('app/views/friends/show'),
    FriendsIndexView = require('app/views/friends/index'),
    AuthView = require('app/views/auth/auth'),
    MessagesNewView = require('app/views/messages/new');

  return Backbone.Router.extend({
    routes: {
      "": "auth",
      "account": "account",
      "dashboard": "dashboard",
      "friends": "friendsIndex",
      "friends/:id": "friendsShow",
      "messages/new": "messagesNew"
    },

    initialize: function (options) {
      this.$rootEl = options.$rootEl;
      this.$footerEl = options.$footerEl;
      this.listenTo(app.currentUser, "loggedOut", this.auth);
    },

    account: function () {
      var view = new AccountView();
      this._swapSingleView(view);
      this._installFooter();
    },

    auth: function () {
      console.log("auth route called");
      var view = new AuthView();
      this._swapSingleView(view);
    },

    currentRoute: function () {
      return Backbone.history.location.hash || "dashboard";
    },

    dashboard: function () {
      console.log("im on the dashboard");
      var portraitView = new DashboardView();
      var landscapeView = new DashboardLandscapeView();
      this._swapOrientedViews(portraitView, landscapeView);
      this._installFooter();
    },

    friendsIndex: function () {
      var view = new FriendsIndexView();
      this._swapSingleView(view);
      this._installFooter();
    },

    friendsShow: function (id) {
      var view = new FriendsShowView(id);
      this._swapSingleView(view);
      this._installFooter();
    },

    messagesNew: function () {
      var view = new MessagesNewView();
      this._swapSingleView(view);
    },

    _installFooter: function () {
      var footer = new FooterView({
        router: this
      });
      this.$footerEl.html(footer.render().$el);
    },

    _swapOrientedViews: function (portrait, landscape) {
      app.orCount = 2;
      if (window.orientation === 0) {
        console.log("current view is portrait");
        this._swapView(portrait);
      } else {
        console.log("current view is landscape");
        this._swapView(landscape);
      }

      window.addEventListener('orientationchange', function (e) {
        if (e.detail.toOrientation === 2 || e.detail.toOrientation === 3) {
          this._swapView(landscape);
        } else {
          this._swapView(portrait);
        }
        window.removeEventListener('orientationchange');
      }.bind(this), false);
    },

    _swapSingleView: function (view) {
      app.orCount = 1;
      window.removeEventListener('orientationchange');

      this._swapView(view);
    },

    _swapView: function (view) {
      this.currentView && this.currentView.remove();
      this.currentView = view;
      this.$rootEl.html(view.render().$el);
      this.$footerEl.html('');
    }
  });
});
