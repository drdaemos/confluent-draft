'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var ProjectForm = require('scripts/components/widgets/ProjectForm');

// Data
var Users = require('scripts/collections/Users');
var ProjectsData = require('scripts/collections/Projects');
var ProjectStates = require('scripts/collections/ProjectStates');
  
var Component = React.createClass({
  render: function() {  	
  	var data = {
  		states: new ProjectStates(),
  		projects: new ProjectsData()
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<ProjectForm collection={data} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;

