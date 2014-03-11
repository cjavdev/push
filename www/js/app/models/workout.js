/*global define */
define(['backbone', 'app/collections/workout_sets'],
  function (Backbone, WorkoutSetsCollection) {
  "use strict";

  return Backbone.Model.extend({
    parse: function (response) {
      if (response.workout_sets) {
        this.workoutSets().set(response.workout_sets);
        this.workoutSets()._workout_id = response.id;
        delete response.workout_sets;
      }

      return response;
    },

    workoutSets: function () {
      if (!this._workoutSets) {
        this._workoutSets = new WorkoutSetsCollection();
      }

      return this._workoutSets;
    }
  });
});
