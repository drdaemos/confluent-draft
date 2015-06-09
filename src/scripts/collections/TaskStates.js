'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var TaskState = require('scripts/models/TaskState');

var TaskStates = Backbone.Collection.extend({
	model: TaskState,
	key: 'taskStates',

	url: function(){
	    return window.app.API + '/taskstates';
	},

	// initialize: function(){
 //        this.fetch({
 //            success: this.fetchSuccess,
 //            error: this.fetchError
 //        });
 //    },
});

_.bindAll(TaskStates, _.functions(TaskStates));

module.exports = TaskStates;