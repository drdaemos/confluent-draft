'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Project = require('scripts/models/Project');

var Projects = Backbone.Collection.extend({
	model: Project,

	url: function(){
	    return window.app.API + '/projects';
	},

	initialize: function(){
        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },
});

_.bindAll(Projects, _.functions(Projects));

module.exports = Projects;