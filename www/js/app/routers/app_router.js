/*global define, app, window */

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
    Login = require('app/views/account/login'),
    MessagesNew = require('app/views/messages/new');

  return Backbone.Router.extend({
    routes: {
      "": "login",
      "account": "account",
      "dashboard": "dashboard",
      "friends": "friendsIndex",
      "friends/:id": "friendsShow",
      "messages/new": "messagesNew"
    },

    initialize: function (options) {
      this.$rootEl = options.$rootEl;
      this.$footerEl = options.$footerEl;
    },

    account: function () {
      var view = new Account();
      this._swapSingleView(view);
      this._installFooter();
    },

    auth: function () {
      //do some fb auth shit here
      return;
    },

    login: function () {
      var view = new Login();
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
      this._installFooter();
    },

    friendsIndex: function () {
      var view = new FriendsIndex();
      this._swapSingleView(view);
      this._installFooter();
    },

    friendsShow: function (id) {
      var view = new FriendsShow(id);
      this._swapSingleView(view);
      this._installFooter();
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
        if(e.detail.toOrientation === 2 || e.detail.toOrientation === 3) {
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
    }
  });
});
