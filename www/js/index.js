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
      Backbone.history.start();
      app.router = new Router({
        $rootEl: $('main'),
        $footerEl: $('footer'),
        $headerEl: $('header')
      });
    },

    bindEvents: function () {
      FastClick.attach(document.body);
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
      app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    // receivedEvent: function (id) {
    // }
  };

  app.initialize();
});
