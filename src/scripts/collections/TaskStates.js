'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var TaskState = require('scripts/models/TaskState');

var TaskStates = Backbone.Collection.extend({
	model: TaskState,
	fetched: false,

	url: function(){
	    return window.app.API + '/taskstates';
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
        throw new Error("TaskStates fetch error");
    }
});

_.bindAll(TaskStates, _.functions(TaskStates));

module.exports = TaskStates;