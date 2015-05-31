'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = require('scripts/models/User');

var Users = Backbone.Collection.extend({
	model: User,
	fetched: false,

	url: function(){
	    return window.app.API + '/users';
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
        throw new Error("Users fetch error");
    }
});

_.bindAll(Users, _.functions(Users));

module.exports = Users;