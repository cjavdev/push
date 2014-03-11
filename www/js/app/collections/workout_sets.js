/*global define */
define(['backbone', 'app/models/workout_set'],
  function (Backbone, WorkoutSetModel) {
  "use strict";

  return Backbone.Collection.extend({
    url: function () {
      return '/workouts/' + this._workout_id + '/workout_sets';
    },

    model: WorkoutSetModel
  });
});
