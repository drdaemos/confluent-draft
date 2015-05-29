'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('styles/main.less');

// Images

// Elements
var Header = require('scripts/components/Header');	
  
var Application = React.createClass({
	componentDidMount: function() {	
        $('.dropdown').dropdown();
	},
	componentDidUpdate: function() {
        $('.dropdown').dropdown();
	},
	render: function() {
	  	var Page = require('scripts/components/pages/' + this.props.page);
	    return (
		    <div className='ui grid'>
	    		<Header />
	    		<Page />
		    </div>
	    );
	}
});

module.exports = Application;

