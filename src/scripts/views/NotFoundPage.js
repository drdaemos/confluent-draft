'use strict';
var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');

var ConfluentDraftApp = require('scripts/components/ConfluentDraftApp');	

// Elements
var Page = require('scripts/components/pages/NotFound');  

var NotFoundPage = Backbone.View.extend({
    el: $('#page'), // attaches `this.el` to an existing element.     

    initialize: function(){
      this.render(); // not all views are self-rendering. This one is.
    },
    render: function(){
     	var props = {};
      props.page = Page;
      	
		  React.render(<ConfluentDraftApp {...props} />, this.el); // jshint ignore:line
    }
});

_.bindAll(NotFoundPage, _.functions(NotFoundPage));

module.exports = NotFoundPage;