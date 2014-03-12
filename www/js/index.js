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
    'app/views/shared/loading',
    'app/views/account/login'
], function ($, Backbone, FastClick, Router, LoadingView, LoginView) {
  app = {
    initialize: function () {
      this.installLoadingView();
      console.log("app initialize");
      this.bindEvents();
    },

    bindEvents: function () {
      console.log("binding events");
      FastClick.attach(document.body);
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    installLoadingView: function () {
      console.log("install loading views");
      var loadingView = new LoadingView();
      $('#main').html(loadingView.render().$el);
    },

    installLoginView: function () {
      var loginView = new LoginView();
      $('body').html(loginView.render().$el);
    },

    handleStatusChange: function (session) {
      console.log("handling status change");
      console.log(session);
      console.log(session.authResponse);
      if (session.authResponse) {
        FB.api('/me', {
          fields: 'name, picture'
        }, function (response) {
          console.log("in callback of FB.api(/me)");
          if (!response.error) {
            //connected
            console.log("connected");
            //user = response;
            console.log(response);
            console.log("initting router");
            app.router = new Router({
              $rootEl: $('#main'),
              $footerEl: $('footer')
            });
            Backbone.history.start();
          } else {
            //not connected
            console.log("not connected");
            console.log('Error getting user info: ' + JSON.stringify(response.error));
            if (response.error.error_subcode && response.error.error_subcode == "458") {
              setTimeout(function () {
                alert("App was uninstalled, Please log in again.");
                app.installLoginView();
              }, 0);
            }

            FB.logout(function (response) {
              console.log("logging out");
              console.log(response);
              window.location.reload();
            });

          }
        });
      } else {
        app.installLoginView();
      }
    },

    onDeviceReady: function () {
      console.log("device is ready");

      if (parseFloat(window.device.version) === 7) {
        document.body.style.marginTop = "20px";
      }
      app.receivedEvent('deviceready');

      console.log("initting FB");
      FB.init({
        appId: '1389364367952791',
        nativeInterface: CDV.FB,
        useCachedDialogs: false
      });

      // before initializing the router:
      // 1. try to see if the user is logged in
      // 2. if they're not logged in, then show the login/signup view
      // 3. if they are logged in, then initialize router and start history
      console.log("getting login status of FB");
      FB.getLoginStatus(app.handleStatusChange);
      console.log("try subscribing to auth.statusChange");
      FB.Event.subscribe('auth.statusChange', app.handleStatusChange);
      //window.updateAuthElements();
    },

    //   if (session.authResponse) {
    //     //document.body.className = 'connected';
    //     //Fetch user's id, name, and picture
    //     FB.api('/me', {
    //       fields: 'name, picture'
    //     }, function (response) {
    //       if (!response.error) {
    //         document.body.className = 'connected';
    //         user = response;
    //         console.log('Got the users name and picture: ' + JSON.stringify(response));
    //
    //         //Update display of user name and picture
    //         if (document.getElementById('user-name')) {
    //           document.getElementById('user-name').innerHTML = user.name;
    //         }
    //         if (document.getElementById('user-picture')) {
    //           document.getElementById('user-picture').src = user.picture.data.url;
    //         }
    //       } else {
    //         document.body.className = 'not_connected';
    //         console.log('Error getting user info: ' + JSON.stringify(response.error));
    //
    //         // Check for errors due to app being unininstalled
    //         if (response.error.error_subcode && response.error.error_subcode == "458") {
    //           setTimeout(function () {
    //             alert("Please log in again.");
    //           }, 0);
    //         }
    //         logout();
    //       }
    //     });
    //   } else {
    //     document.body.className = 'not_connected';
    //   }
    // }


    //window.authUser();

    // Update DOM on a Received Event
    receivedEvent: function (id) {
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
