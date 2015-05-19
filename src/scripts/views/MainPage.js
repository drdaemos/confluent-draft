'use strict';
var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');

var ConfluentDraftApp = require('../components/ConfluentDraftApp');	

var MainPage = Backbone.View.extend({
    el: $('#page'), // attaches `this.el` to an existing element.     

    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

      this.render(); // not all views are self-rendering. This one is.
    },
    render: function(){
     	var props = {};
      	props.message = 'MainPage';
      	
		React.render(<ConfluentDraftApp {...props} />, this.el); // jshint ignore:line
    }
});

module.exports = MainPage;