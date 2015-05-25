'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('../../styles/header.less');
  
var Header = React.createClass({
  render: function() {
    return (
      <header className='header ui menu page grid inverted'>
      	<div className='container'>
      		<a className='launch item'>
		      <i className='content icon'></i>
		      <span> Menu </span>
		    </a>
		    <div className='right menu'>
		    	<div className="ui dropdown">
				  <div className="text">james@rolfe.com</div>
				  <i className="dropdown icon"></i>
				  <div className="menu">
				    <div className="header">Profile</div>
				    <div className="item">Logout</div>
				  </div>
				</div>
		    </div>
      	</div>
      </header>
    );
  }
});

module.exports = Header;

