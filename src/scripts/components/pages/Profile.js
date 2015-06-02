'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Profile = require('scripts/components/widgets/Profile');

// Data
var Roles = require('scripts/collections/Roles');
var Users = require('scripts/collections/Users');
  
var Component = React.createClass({
  render: function() {  	 	
  	var data = {
  		roles: new Roles(),
  		users: new Users(),
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui centered grid stackable'>
		    			<Profile collection={data} query={this.props.query} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;

