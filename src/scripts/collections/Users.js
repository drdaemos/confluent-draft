'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = require('scripts/models/User');

var Users = Backbone.Collection.extend({
	model: User,
	key: 'users',

	url: function(){
	    return window.app.API + '/users';
	},

	// initialize: function(){
 //        this.fetch({
 //            success: this.fetchSuccess,
 //            error: this.fetchError
 //        });
 //    },
});

_.bindAll(Users, _.functions(Users));

module.exports = Users;