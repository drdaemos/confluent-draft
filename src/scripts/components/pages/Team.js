'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Team = require('scripts/components/widgets/Team');

// Data
var Users = require('scripts/collections/Users');
var Roles = require('scripts/collections/Roles');
  
var Component = React.createClass({
  render: function() {
  	var collection = {
  		users: new Users(),
  		roles: new Roles()
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

