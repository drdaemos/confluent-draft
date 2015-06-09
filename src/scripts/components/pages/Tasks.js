'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Tasks = require('scripts/components/widgets/Tasks');
var TaskFilters = require('scripts/components/widgets/TaskFilters');
  
var Component = React.createClass({
  render: function() {
  	var data = {
      tasks: window.app.collections.tasks,
      states: window.app.collections.taskStates, 
      users: window.app.collections.users,
      comments: window.app.collections.taskComments,
      projects: window.app.collections.projects,
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<TaskFilters collection={data} />
		    			<Tasks collection={data} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;

