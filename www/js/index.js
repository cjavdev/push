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
    'app/routers/app_router',
    'app/views/shared/footer'
], function ($, Backbone, Router, Footer) {
  app = {
    initialize: function () {
      this.bindEvents();
      this.installFooter();
      new Router();
      Backbone.history.start();
    },

    installFooter: function () {
      var footerView = new Footer();
      $('#footer').html(footerView.render().$el);
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
