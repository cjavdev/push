/*global define */
define(function (require) {
  "use strict";

  var Backbone = require('backbone'),
      WorkoutSetsCollection = require('app/collections/workout_sets');

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
