'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Task = require('scripts/components/widgets/Task');

// Data
var TasksData = require('scripts/collections/Tasks');
var TaskStates = require('scripts/collections/TaskStates');
var Users = require('scripts/collections/Users');
var TaskComments = require('scripts/collections/TaskComments');
var Projects = require('scripts/collections/Projects');
  
var Component = React.createClass({
  render: function() {    
  	var data = {
  		tasks: new TasksData(),
  		states: new TaskStates(), 
  		users: new Users(),
  		comments: new TaskComments(),
  		projects: new Projects()
  	};	
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<Task collection={data} query={this.props.query} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;

