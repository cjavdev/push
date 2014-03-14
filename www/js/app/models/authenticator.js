/*global define, FB, CDV, window, app */

define(['jquery',
    'lodash',
    'backbone',
    'require',
    'app/models/user'
], function ($, _, Backbone, require, UserModel) {

  "use strict";
  return UserModel.extend({
    defaults: {
      loggedIn: false
    },

    initialize: function () {
      FB.init({
        appId: '1389364367952791',
        nativeInterface: CDV.FB,
        useCachedDialogs: false
      });

      // 1. try to see if the user is logged in
      // 2. if they're not logged in, then show the login/signup view
      // 3. if they are logged in, then initialize router and start history
      console.log("getting login status of FB");
      FB.getLoginStatus(this.handleStatusChange.bind(this));
      console.log("try subscribing to auth.statusChange");
      FB.Event.subscribe('auth.statusChange', this.handleStatusChange.bind(this));
    },

    handleStatusChange: function (session) {
      console.log("handling status change from authenticator");
      console.log(session);
      console.log(session.authResponse);
      if (session.authResponse) {
        this.set({ loggedIn:  true });
        this.trigger("loggedIn");
        // send to rails

        FB.api('/me', {
          fields: 'name, link, first_name, last_name, picture, email'
        }, function (response) {
          $.ajax({
            url: 'http://localhost:3000/session',
            type: 'POST',
            data: _.extend(session, response),
            success: function (model) {
              app.currentUser.set(app.currentUser.parse(model));
            },
            error: function () {
              console.log(arguments);
            }
          });

          if (!response.error) {
            //connected
            console.log("connected");
            //user = response;
            console.log(response);
            // set('name', name)
            // set('picture', picture)
            this.trigger("loggedIn");
          } else {
            //not connected
            console.log("not connected");
            console.log('Error getting user info: ' + JSON.stringify(response.error));
            if (response.error.error_subcode && response.error.error_subcode == "458") {
              setTimeout(function () {
                this.trigger("uninstalled");
                alert("App was uninstalled, Please log in again.");
              }.bind(this), 0);
            }
            this.logout();
          }
        }.bind(this));
      } else {
        console.log("triggering logged out");
        this.trigger("loggedOut");
        this.set({ loggedIn: false });
      }
    },

    login: function () {
      console.log("login was called on authenticator");
      FB.login(this.loginResponse.bind(this), {
        scope: 'email'
      });
    },

    loginResponse: function () {
      console.log("login Response");
      FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          this.set({ loggedIn: true });
          this.trigger("loggedIn");
        } else {
          this.set({ loggedIn: false });
          this.trigger("loggedOut");
        }
      }.bind(this));
    },

    logout: function () {
      console.log("logout");
      this.trigger("loggedOut");
      FB.logout(function (response) {
        this.set({ loggedIn: false });
        console.log("logging out");
        console.log(response);
        window.location.reload();
      }.bind(this));
    }
  });
});
