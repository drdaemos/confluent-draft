'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Role = require('scripts/models/Role');

var Roles = Backbone.Collection.extend({
	model: Role,
	key: 'roles',

	url: function(){
	    return window.app.API + '/userroles';
	},

	// initialize: function(){
 //        this.fetch({
 //            success: this.fetchSuccess,
 //            error: this.fetchError
 //        });
 //    },
});

_.bindAll(Roles, _.functions(Roles));

module.exports = Roles;