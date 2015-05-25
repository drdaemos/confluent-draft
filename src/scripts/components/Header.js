'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('../../styles/header.less');
  
var Header = React.createClass({
  render: function() {
    return (
      <header className='row'>
      	<div className='wide column'>
	      	<div className='ui navbar menu inverted page grid'>
	      		<a className='launch item'>
			      <span> Draft </span>
			    </a>
			    <div className='right menu'>
			    	<a className="ui dropdown item">
					  <span className="text user">james@rolfe.com</span>
					  <i className="dropdown icon"></i>
					  <div className="menu">
					    <div className="item">Profile</div>
					    <div className="item">Logout</div>
					  </div>
					</a>
			    </div>
	      	</div>
      	</div>
      </header>
    );
  }
});

module.exports = Header;

