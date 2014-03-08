/*global define */
define(function (require) {
  "use strict";

  var _ = require('lodash'),
    Backbone = require('backbone'),
    jst = require('text!app/templates/friends/show.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    render: function () {
      var content = template();
      this.$el.html(content);
      return this;
    }
  });
});
