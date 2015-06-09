'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var ProjectState = require('scripts/models/ProjectState');

var ProjectStates = Backbone.Collection.extend({
	model: ProjectState,
	key: 'projectStates',
    
	url: function(){
	    return window.app.API + '/projectstates';
	},

	// initialize: function(){
 //        this.fetch({
 //            success: this.fetchSuccess,
 //            error: this.fetchError
 //        });
 //    },
});

_.bindAll(ProjectStates, _.functions(ProjectStates));

module.exports = ProjectStates;