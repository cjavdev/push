/*global define */
define(function (require) {
  "use strict";

  var _ = require('lodash'),
    Backbone = require('backbone'),
    Chart = require('chart'),
    jst = require('text!app/templates/dashboard/landscape.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    render: function () {
      var content = template();
      this.$el.html(content);
      return this;
    }
  });
});
