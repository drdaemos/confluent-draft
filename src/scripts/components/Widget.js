'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('styles/widget.less');

// Images

// Elements
  
var Widget = React.createClass({
  render: function() {
    return (
	    <div className='{this.props.width} column'>
    		<div className='ui segment grid widget'>
				{ this.props.children }
			</div>
	    </div>
    );
  }
});

module.exports = Widget;

