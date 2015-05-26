'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var OpenedTasks = React.createClass({
  render: function() {
  	var props = {};
  	props.width = 'ten';
    return (
	    <Widget {...props}>
	    	<div className='ui huge header'> Opened Tasks </div>
		    <p> Some fake tasks</p>
	    </Widget>
    );
  }
});

module.exports = OpenedTasks;

