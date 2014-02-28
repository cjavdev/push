define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
    jst = require('text!app/templates/shared/footer.jst'),
    template = _.template(jst);

  return Backbone.View.extend({
    initialize: function (options) {
      this.router = options.router;
      this.listenTo(this.router, "route", this.render);
    },

    render: function () {
      var content = template({
        activeClass: this.activeClass.bind(this),
        tabClass: this.tabClass.bind(this)
      });
      this.$el.html(content);
      return this;
    },

    tabClass: function (btnTitle) {
      var klass = '';
      var mappings = {
        'account': 'ion-ios7-star',
        'dashboard' : 'ion-ios7-speedometer',
        'friend' : 'ion-ios7-people'
      };
      klass = mappings[btnTitle];
      if(this.activeClass(btnTitle) !== 'active') {
        klass += '-outline';
      }
      return klass;
    },

    activeClass: function (btnTitle) {
      if (this.router.currentRoute().indexOf(btnTitle) !== -1) {
        return 'active';
      }
    }
  });
});
