/*global define */
define(['backbone', 'app/models/workout'],
  function (Backbone, WorkoutModel) {
  "use strict";

  return Backbone.Collection.extend({
    url: '/workouts',
    model: WorkoutModel
  });
});
