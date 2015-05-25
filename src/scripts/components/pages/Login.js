'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('../Page');
  
var Login = React.createClass({
  render: function() {
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui basic segment'>
		    			<p> Login Page </p>		    			
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Login;

