'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Project = require('scripts/models/Project');

var Projects = Backbone.Collection.extend({
	model: Project,
	fetched: false,

	url: function(){
	    return window.app.API + '/projects';
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
        throw new Error("Projects fetch error");
    }
});

_.bindAll(Projects, _.functions(Projects));

module.exports = Projects;