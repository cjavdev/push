define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
    jst = require('text!app/templates/dashboard/dashboard.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    render: function () {
      var content = template();
      this.$el.html(content);
      return this;
    }
  });
});
