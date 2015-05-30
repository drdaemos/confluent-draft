'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = require('scripts/models/User');

var Users = Backbone.Collection.extend({
	model: User,

	url: function(){
	    return window.app.API + '/users';
	}

});

_.bindAll(User, _.functions(User));

module.exports = User;