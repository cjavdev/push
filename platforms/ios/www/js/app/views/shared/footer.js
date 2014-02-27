define(function (require) {
  "use strict";

  var $ = require('jquery'),
    Backbone = require('backbone'),
    footerJst = require('text!app/templates/shared/footer.jst'),
    footerTemplate = _.template(footerJst);

  return Backbone.View.extend({
    render: function () {
      var content = footerTemplate();
      this.$el.html(content);
      return this;
    }
  });
});
