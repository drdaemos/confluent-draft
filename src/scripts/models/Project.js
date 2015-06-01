'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Project = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
		deleted: false,
		name: '', 
		state_id: 0,
		description: '',
		client_data: '',
		tag: '',
		started_date: '',
		managed_id: 0
	},

	url: function(){
	    return window.app.API + '/projects';
	}

});

_.bindAll(Project, _.functions(Project));

module.exports = Project;