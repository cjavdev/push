/*global window, document, app:true, FB, CDV */

window.app = {};

require.config({
  baseUrl: 'js/lib',

  paths: {
    app: '../app',
    tpl: '../templates',
  },

  shim: {
    'backbone': {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },
    'lodash': {
      exports: '_'
    }
  }
});

require(['jquery',
    'backbone',
    'fastclick',
    'app/routers/app_router',
    'app/models/authenticator'
], function ($, Backbone, FastClick, Router, Authenticator) {
  app = {
    currentUser: new Authenticator(),

    initialize: function () {
      console.log("app initialize");
      this.bindEvents();
      console.log("apps current user: " + app.currentUser.attributes);
    },

    bindEvents: function () {
      console.log("binding events");
      FastClick.attach(document.body);
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // handleStatusChange: function (session) {
    //   console.log("handling status change");
    //   console.log(session);
    //   console.log(session.authResponse);
    //   if (session.authResponse) {
    //     // send to rails
    //     FB.api('/me', {
    //       fields: 'name, picture'
    //     }, function (response) {
    //       console.log("in callback of FB.api(/me)");
    //       if (!response.error) {
    //         //connected
    //         console.log("connected");
    //         //user = response;
    //         console.log(response);
    //         console.log("initting router");
    //         app.startRouter();
    //       } else {
    //         //not connected
    //         console.log("not connected");
    //         console.log('Error getting user info: ' + JSON.stringify(response.error));
    //         if (response.error.error_subcode && response.error.error_subcode == "458") {
    //           setTimeout(function () {
    //             alert("App was uninstalled, Please log in again.");
    //             app.installLoginView();
    //           }, 0);
    //         }
    //         FB.logout(function (response) {
    //           console.log("logging out");
    //           console.log(response);
    //           window.location.reload();
    //         });
    //       }
    //     });
    //   } else {
    //     app.installLoginView();
    //   }
    // },

    onDeviceReady: function () {
      console.log("device is ready");
      app.receivedEvent('deviceready');
      app.startRouter();
    },

    startRouter: function () {
      console.log("app.startRouter");
      app.router = new Router({
        $rootEl: $('#main'),
        $footerEl: $('footer')
      });
      if (!Backbone.History.started) {
        Backbone.history.start();
      }
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
      console.log("received: " + id);
      return id;
    }
  };

  app.initialize();

  window.shouldRotateToOrientation = function ( /* el */ ) {
    if (app.orCount === 1) {
      return false;
    }
    return true;
  };
});
