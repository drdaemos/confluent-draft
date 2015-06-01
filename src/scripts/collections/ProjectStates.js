'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var ProjectState = require('scripts/models/ProjectState');

var ProjectStates = Backbone.Collection.extend({
	model: ProjectState,
	fetched: false,

	url: function(){
	    return window.app.API + '/projectstates';
	},

	initialize: function(){
        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },

    fetchSuccess: function (collection, response) {
    	collection.fetched = true;
    	collection.trigger('update');
        console.log('Collection models: ', collection.models);
    },

    fetchError: function (collection, response) {
        throw new Error("ProjectStates fetch error");
    }
});

_.bindAll(ProjectStates, _.functions(ProjectStates));

module.exports = ProjectStates;