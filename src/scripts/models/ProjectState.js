'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var ProjectState = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
	    state: ''
	},

	url: function(){
	    return window.app.API + '/projectstates';
	}

});

_.bindAll(ProjectState, _.functions(ProjectState));

module.exports = ProjectState;