'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Task = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
	    deleted: false,
		name: '', 
		state_id: 0,
		description: '',
		estimation: '',
		progress: '',
		started_date: '',
		assigned_id: 0,
		project_id: 0
	},

	url: function(){
	    return window.app.API + '/tasks';
	}

});

_.bindAll(Task, _.functions(Task));

module.exports = Task;