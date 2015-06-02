var Backbone = require('backbone');
var _ = require('underscore');

_.extend(Backbone.Collection.prototype, {
    fetched: false,

    tryGet: function (id, defaultValue, field) {
    	if (!_.isUndefined(this.get(id))) {
    		if (!_.isUndefined(field) && !_.isUndefined(this.get(id).get(field))) {
    			return this.get(id).get(field);
    		} else {
    			return this.get(id);
    		}
    	} else {
    		return defaultValue;
    	}
    },
    fetchSuccess: function (collection, response) {
    	collection.fetched = true;
    	collection.trigger('update');
        console.log('Collection models: ', collection.models);
    },

    fetchError: function (collection, response) {
        throw new Error("Tasks fetch error");
    }
});