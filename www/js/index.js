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

require(['jquery', 'backbone', 'app/routers/app_router'], function ($, Backbone, Router) {
  app = {
    initialize: function () {
      this.bindEvents();
      new Router({
        '$rootEl': $("main")
      });
      Backbone.history.start();
    },

    bindEvents: function () {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
      app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
  };

  app.initialize();
});
