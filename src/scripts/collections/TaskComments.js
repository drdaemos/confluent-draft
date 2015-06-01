'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var TaskComment = require('scripts/models/TaskComment');

var TaskComments = Backbone.Collection.extend({
	model: TaskComment,
	fetched: false,

	url: function(){
	    return window.app.API + '/comments';
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
        throw new Error("TaskComments fetch error");
    }
});

_.bindAll(TaskComments, _.functions(TaskComments));

module.exports = TaskComments;