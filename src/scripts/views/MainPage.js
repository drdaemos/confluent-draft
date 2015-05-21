'use strict';
var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');

var ConfluentDraftApp = require('../components/ConfluentDraftApp');	

var MainPage = Backbone.View.extend({
    el: $('#page'), // attaches `this.el` to an existing element.     

    initialize: function(){
      this.render(); // not all views are self-rendering. This one is.
    },
    render: function(){
     	var props = {};
      props.message = 'MainPage';
      	
		  React.render(<ConfluentDraftApp {...props} />, this.el); // jshint ignore:line
    }
});

_.bindAll(MainPage, _.functions(MainPage));

module.exports = MainPage;