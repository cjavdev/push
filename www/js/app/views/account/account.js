/*global define, FB, window */
define(function (require) {
  "use strict";

  var _ = require('lodash'),
    Backbone = require('backbone'),
    jst = require('text!app/templates/account/account.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    events: {
      "click #logout": "logout"
    },

    logout: function (event) {
      event.preventDefault();
      console.log("logging out");
      FB.logout(function (response) {
        console.log("logged out");
        console.log(response);
        Backbone.history.navigate("#/login", { trigger: true });
      });
    },

    render: function () {
      var content = template();
      this.$el.html(content);
      return this;
    }
  });
});
