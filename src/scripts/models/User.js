'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = Backbone.Model.extend({
  	initialize: function(){
            _.bindAll(this);
	},

	defaults: {
	    id: 0,
	    login: '',
	    name: '',
	    email: ''
	},

	url: function(){
	    return window.app.API + '/user';
	}

});

module.exports = User;