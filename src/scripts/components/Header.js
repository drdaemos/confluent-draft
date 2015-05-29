'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

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
	getInitialState: function() {
	    return {
	    	id: _.uniqueId('header-navbar-')
	    };
	},
	componentDidMount: function() {	
        $('#' + this.state.id + ' .right.menu .dropdown').dropdown({
        	action: 'hide'
        });
	},
	componentDidUpdate: function() {
        $('#' + this.state.id + ' .right.menu .dropdown').dropdown({
        	action: 'hide'
        });
	},
  	render: function() {  
	  	var userButton;
		if (window.app.session.get('logged_in')) {
		  userButton = <Header.Navbar.User />;
		} else {
		  userButton = <Header.Navbar.Anonymous />;
		}		
	    return (
			<div className='ui navbar menu inverted page grid' id={this.state.id}>
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
			    {userButton}
			</div>
	    );
  	}
});

Header.Navbar.User = React.createClass({
 	mixins: [backboneMixin],
  	render: function() {
	    return (
			<div className='right menu'>
			    <div className="ui dropdown item">
				  	<div className="text user">{window.app.session.user.get('name')}</div>
				  	<i className="dropdown icon"></i>
				  	<div className="menu">
					    <a className="item" href="#profile">Profile</a>
					    <a className="item" href="#logout">Logout</a>
				  	</div>
				</div>			
			</div>
	    );
	}
});

Header.Navbar.Anonymous = React.createClass({
  	render: function() {
	    return (
			<div className='right menu'>
			    <a className='item' href='#login'>
			      <span> Login </span>
			    </a>
			    <a className='item' href='#signup'>
			      <span> Signup </span>
			    </a>		
			</div>
	    );
	}
});

module.exports = Header;

