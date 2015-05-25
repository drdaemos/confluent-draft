'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('../../styles/main.less');

// Images
var imageURL = require('../../images/yeoman.png');

// Elements
var Header = require('./Header');	
  
var ConfluentDraftApp = React.createClass({
  render: function() {
  	var Page = this.props.page;
    return (
	    <div className='ui grid'>
    		<Header />
    		<Page />
	    </div>
    );
  }
});

module.exports = ConfluentDraftApp;

