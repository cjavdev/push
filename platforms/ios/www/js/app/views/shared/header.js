define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
    jst = require('text!app/templates/shared/header.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    initialize: function (options) {
      this.router = options.router;
      this.listenTo(this.router, "route", this.render);
    },

    render: function () {
      var content = template({
        tabClass: this.tabClass.bind(this)
      });
      this.$el.html(content);
      return this;
    },

    tabClass: function (btnTitle) {
      if(this.router.currentRoute().indexOf(btnTitle) !== -1) {
        return 'active';
      }
    }
  });
});
