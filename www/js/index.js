window.app = {};

require.config({
  baseUrl: 'js/lib',

  paths: {
    app: '../app',
    tpl: '../templates'
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
    'app/routers/app_router'
], function ($, Backbone, FastClick, Router) {
  app = {
    initialize: function () {
      this.bindEvents();
      app.router = new Router({
        $rootEl: $('#main'),
        $footerEl: $('footer')
      });
      Backbone.history.start();
    },

    bindEvents: function () {
      FastClick.attach(document.body);
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
      if (parseFloat(window.device.version) === 7.0) {
        document.body.style.marginTop = "20px";
      }
      app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {}
  };

  app.initialize();

  window.shouldRotateToOrientation = function (el) {
    console.log("app orCount: " + app.orCount);
    if (app.orCount === 1) {
      console.log("should not Rotate: " + el);
      return false;
    } else {
      console.log("should Rotate: " + el);
      return true;
    }
  };
});
