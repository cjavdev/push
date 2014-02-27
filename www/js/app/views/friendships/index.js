define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone'),
    jst = require('text!app/templates/friendships/index.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    render: function () {
      var content = template();
      this.$el.html(content);
      return this;
    }
  });
});
