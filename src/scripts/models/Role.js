'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Role = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: 0,
	    role: ''
	},

	url: function(){
	    return window.app.API + '/userroles';
	}

});

_.bindAll(Role, _.functions(Role));

module.exports = Role;