define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Account = require('app/views/account/account'),
    Backbone = require('backbone'),
    Dashboard = require('app/views/dashboard/dashboard'),
    DashboardLandscape = require('app/views/dashboard/landscape'),
    Footer = require('app/views/shared/footer'),
    FriendsShow = require('app/views/friends/show'),
    FriendsIndex = require('app/views/friends/index'),
    MessagesNew = require('app/views/messages/new');

  return Backbone.Router.extend({
    routes: {
      "": "dashboard",
      "account": "account",
      "dashboard": "dashboard",
      "friends": "friendsIndex",
      "friends/:id": "friendsShow",
      "messages/new": "messagesNew"
    },

    initialize: function (options) {
      this.$rootEl = options.$rootEl;
      this.$footerEl = options.$footerEl;

      this._installFooter();
    },

    account: function () {
      var view = new Account();
      this._swapSingleView(view);
    },

    currentRoute: function () {
      return Backbone.history.location.hash || "dashboard";
    },

    dashboard: function () {
      var portraitView = new Dashboard();
      var landscapeView = new DashboardLandscape();
      this._swapOrientedViews(portraitView, landscapeView);
      //this._swapOrientedViews(landscapeView, landscapeView);
    },

    friendsIndex: function () {
      var view = new FriendsIndex();
      this._swapSingleView(view);
    },

    friendsShow: function (id) {
      var view = new FriendsShow(id);
      this._swapSingleView(view);
    },

    messagesNew: function () {
      var view = new MessagesNew();
      this._swapSingleView(view);
    },

    _installFooter: function () {
      var footer = new Footer({
        router: this
      });
      this.$footerEl.html(footer.render().$el);
    },

    _orientationEvent: function () {
      var supportsOrientationChange = window.hasOwnProperty("onorientationchange")
      return supportsOrientationChange ? "orientationchange" : "resize";
    },

    _swapOrientedViews: function (portrait, landscape) {
      app.supportedOrientations = 2;

      if (window.orientation === 0) {
        this._swapView(portrait);
      } else {
        this._swapView(landscape);
      }

      window.addEventListener(this._orientationEvent(), function () {
        window.removeEventListener(this._orientationEvent());
        this._swapOrientedViews(portrait, landscape);
      }.bind(this), false);
    },

    _swapSingleView: function (view) {
      window.removeEventListener(this._orientationEvent());
      app.supportedOrientations = 1;
      this._swapView(view);
    },

    _swapView: function (view) {
      this.currentView && this.currentView.remove();
      this.currentView = view;
      this.$rootEl.html(view.render().$el);
    }
  });
});
