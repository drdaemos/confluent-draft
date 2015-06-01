'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Task = require('scripts/models/Task');

var Tasks = Backbone.Collection.extend({
	model: Task,
	fetched: false,

	url: function(){
	    return window.app.API + '/tasks';
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
        throw new Error("Tasks fetch error");
    }
});

_.bindAll(Tasks, _.functions(Tasks));

module.exports = Tasks;