'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
	    username: '',
	    name: '',
	    role_id: ''
	},

	url: function(){
	    return window.app.API + '/user';
	}

});

_.bindAll(User, _.functions(User));

module.exports = User;