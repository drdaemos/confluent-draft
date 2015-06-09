'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var ProjectForm = require('scripts/components/widgets/ProjectForm');
  
var Component = React.createClass({
  render: function() {  	
  	var data = {
  		states: window.app.collections.projectStates,
  		projects: window.app.collections.projects,
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

