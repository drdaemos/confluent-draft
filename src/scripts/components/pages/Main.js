'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
  
var Main = React.createClass({
  render: function() {
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui basic segment'>
		    			<p> Main Page </p>
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Main;

