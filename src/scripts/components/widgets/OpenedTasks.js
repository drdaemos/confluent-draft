'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var OpenedTasks = React.createClass({
  render: function() {
    return (
	    <Widget width={'ten'} title={'Opened Tasks'}>
		    <div className='ui relaxed list'>
          <div className='item'>
            <i className='tag icon'></i>
            <div className='content'>
              <a className='header'> DRAFT-1 Prepare UML Diagrams for a project </a>
              <div className='description'> Use Case, Classes, ER, Deployment and DFD are needed </div>
            </div>
          </div>
          <div className='item'>
            <i className='tag icon'></i>
            <div className='content'>
              <a className='header'> DRAFT-2 Describe program business model and processes </a>
              <div className='description'> A few pages should be enough. </div>
            </div>
          </div>
          <div className='item'>
            <i className='tag icon'></i>
            <div className='content'>
              <a className='header'> DRAFT-3 Configure build system </a>
              <div className='description'>I recommend using grunt, look for some examples at blabla.com </div>
            </div>
          </div>
        </div>
	    </Widget>
    );
  }
});

module.exports = OpenedTasks;

