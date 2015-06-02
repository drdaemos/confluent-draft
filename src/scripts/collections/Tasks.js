'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Task = require('scripts/models/Task');

var Tasks = Backbone.Collection.extend({
	model: Task,	

	url: function(){
	    return window.app.API + '/tasks';
	},

	initialize: function(){
        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });
    },    
});

_.bindAll(Tasks, _.functions(Tasks));

module.exports = Tasks;