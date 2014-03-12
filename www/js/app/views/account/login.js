/*global define, _, app, FB, document */
define(function (require) {
  "use strict";

  var _ = require('lodash'),
    Backbone = require('backbone'),
    jst = require('text!app/templates/account/login.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    initialize: function () {
      FB.Event.subscribe('auth.statusChange', this.handleStatusChange);
    },

    events: {
      "click button": "login"
    },

    handleStatusChange: function (session) {
      var user = [];
      //var permissions = ['user_status', 'publish_checkins', 'user_likes'];

      console.log('Got the users session: ' + JSON.stringify(session));

      if (session.authResponse) {
        //document.body.className = 'connected';
        //Fetch user's id, name, and picture
        FB.api('/me', {
          fields: 'name, picture'
        }, function (response) {
          if (!response.error) {
            document.body.className = 'connected';
            user = response;
            console.log('Got the users name and picture: ' + JSON.stringify(response));

            //Update display of user name and picture
            if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
            }
            if (document.getElementById('user-picture')) {
              document.getElementById('user-picture').src = user.picture.data.url;
            }
          } else {
            document.body.className = 'not_connected';
            console.log('Error getting user info: ' + JSON.stringify(response.error));

            // Check for errors due to app being unininstalled
            if (response.error.error_subcode && response.error.error_subcode == "458") {
              setTimeout(function () {
                alert("Please log in again.");
              }, 0);
            }
            logout();
          }
        });
      } else {
        document.body.className = 'not_connected';
      }
    },

    login: function (event) {
      event.preventDefault();
      FB.login(app.handleStatusChange, {
        scope: 'email'
      });
    },

    render: function () {
      var content = template();
      this.$el.html(content);
      return this;
    }
  });
});
