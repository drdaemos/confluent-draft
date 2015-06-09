'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Project = require('scripts/models/Project');

var Projects = Backbone.Collection.extend({
	model: Project,
	key: 'projects',

	url: function(){
	    return window.app.API + '/projects';
	},
});

_.bindAll(Projects, _.functions(Projects));

module.exports = Projects;