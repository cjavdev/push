define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone');

  return Backbone.Router.extend({
    routes: {
      "" : "root"
    },

    root: function () {

    }
  });
});
