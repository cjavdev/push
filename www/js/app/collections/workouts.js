define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
      WorkoutModel = require('app/models/workout');

  return Backbone.Collection.extend({
    url: '/workouts',
    model: WorkoutModel
  });
});
