'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Team = require('scripts/components/widgets/Team');
  
var Component = React.createClass({
  render: function() {
  	var collection = {
  		users: window.app.collections.users,
  		roles: window.app.collections.roles,
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<Team collection={collection} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;

