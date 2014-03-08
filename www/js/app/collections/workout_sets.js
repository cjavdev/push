define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
      WorkoutSetModel = require('app/models/workout_set');

  return Backbone.Collection.extend({
    url: function () {
      return '/workouts/' + this._workout_id + '/workout_sets';
    },

    model: WorkoutSetModel
  })
});
