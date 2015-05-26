'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('styles/header.less');
  
var Header = React.createClass({
  render: function() {
    return (
	    <header className='row'>
	      	<div className='wide column'>
		      	<Header.Navbar />
	      	</div>
	    </header>
    );
  }
});

Header.Navbar = React.createClass({
  render: function() {
    return (
		<div className='ui navbar menu inverted page grid'>
	  		<a className='launch item active' href='#dashboard'>
		      <span> Dashboard </span>
		    </a>
		    <a className='item' href='#projects'>
		      <span> Projects </span>
		    </a>
		    <a className='item' href='#tasks'>
		      <span> Tasks </span>
		    </a>
		    <a className='item' href='#team'>
		      <span> Team </span>
		    </a>
		    <div className='right menu'>
		    	<div className="ui dropdown item">
				  	<div className="text user">james@rolfe.com</div>
				  	<i className="dropdown icon"></i>
				  	<div className="menu">
					    <a className="item" href="#profile">Profile</a>
					    <a className="item" href="#logout">Logout</a>
				  	</div>
				</div>
		    </div>
		</div>
    );
  }
});

module.exports = Header;

