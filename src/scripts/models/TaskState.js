'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var TaskState = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
	    state: ''
	},

	url: function(){
	    return window.app.API + '/taskstates';
	}

});

_.bindAll(TaskState, _.functions(TaskState));

module.exports = TaskState;