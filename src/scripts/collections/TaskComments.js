'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var TaskComment = require('scripts/models/TaskComment');

var TaskComments = Backbone.Collection.extend({
	model: TaskComment,
	key: 'taskComments',

	url: function(){
	    return window.app.API + '/comments';
	},

	// initialize: function(){
 //        this.fetch({
 //            success: this.fetchSuccess,
 //            error: this.fetchError
 //        });
 //    },
});

_.bindAll(TaskComments, _.functions(TaskComments));

module.exports = TaskComments;