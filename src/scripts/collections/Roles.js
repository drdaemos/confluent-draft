'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Role = require('scripts/models/Role');

var Roles = Backbone.Collection.extend({
	model: Role,
    fetched: false,

	url: function(){
	    return window.app.API + '/userroles';
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
        throw new Error("Roles fetch error");
    }
});

_.bindAll(Roles, _.functions(Roles));

module.exports = Roles;