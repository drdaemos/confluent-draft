'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var OpenedTasks = require('scripts/components/widgets/OpenedTasks');
var Recents = require('scripts/components/widgets/Recents');

// Data
var Tasks = require('scripts/collections/Tasks');
var TaskStates = require('scripts/collections/TaskStates');
var Users = require('scripts/collections/Users');
var ProjectsData = require('scripts/collections/Projects');
var ProjectStates = require('scripts/collections/ProjectStates');
  
var Component = React.createClass({
  render: function() {  	 	
  	var data = {
  		tasks: new Tasks(),
  		states: new TaskStates(),
  		users: new Users(),
  		projects: new ProjectsData()
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<OpenedTasks collection={data} />
		    			<Recents />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;

