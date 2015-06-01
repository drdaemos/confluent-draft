'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var TaskComment = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
		created_id: 0,
		task_id: 0,
		message: '',
		created_date: ''
	},

	url: function(){
	    return window.app.API + '/comments';
	}

});

_.bindAll(TaskComment, _.functions(TaskComment));

module.exports = TaskComment;