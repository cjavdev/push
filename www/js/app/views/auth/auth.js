/*global define, _, app, FB, document, window */
define(function (require) {
  "use strict";

  var _ = require('lodash'),
    Backbone = require('backbone'),
    loginJst = require('text!app/templates/auth/login.jst'),
    loadingJst = require('text!app/templates/shared/loading.jst'),
    loginTemplate = _.template(loginJst),
    loadingTemplate = _.template(loadingJst);

  return Backbone.View.extend({
    initialize: function () {
      this.listenTo(app.currentUser, "loggedIn", this.permit);
      this.listenTo(app.currentUser, "loggedOut uninstalled", this.render);
    },

    // "imortality!!!"
    remove: function () {
      return;
    },

    events: {
      "click button": "login"
    },

    permit: function () {
      console.log("loggedIn must have been triggered because I'm permitting");
      Backbone.history.navigate("dashboard", {
        trigger: true
      });
    },

    render: function () {
      if (app.currentUser.get("loggedIn")) {
        console.log("logged in before rendering, BAM!");
        Backbone.history.navigate("dashboard", {
          trigger: true
        });
        return this;
      }

      var content;
      console.log("rendering login template");
      content = loginTemplate();
      this.$el.html(content);
      return this;
    },

    login: function (event) {
      console.log("login clicked");
      event.preventDefault();
      app.currentUser.login();
    }
  });
});
