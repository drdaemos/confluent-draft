'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
  render: function() {
    var daemos = {
        name: 'DrDaemos',
        role: 'Developer',
        avatar: 'daemos.jpg'
    }
    var alive = {
        name: 'Michael',
        role: 'Developer',
        avatar: 'alive.jpg'
    }
    var james = {
        name: 'Vasya',
        role: 'Project Manager',
        avatar: 'vasya.jpg'
    }
    return (
        <Widget width={'sixteen'} title={'Team'}>
            <div className='ui four column grid cards'>
                <Component.User user={daemos} />
                <Component.User user={alive} />
                <Component.User user={james} />
            </div>
        </Widget>
    );
  }
});

Component.User = React.createClass({
  render: function() {
    return (
        <div className="column">
          <div className='ui fluid card'>
            <a className='image'>
              <img src={'/images/avatar/large/' + this.props.user.avatar}/>
            </a>
            <div className='content'>
              <a className='header'>{this.props.user.name}</a>
              <div className='meta'>
                <a>{this.props.user.role}</a>
              </div>
              <div className='description'>
                some blabla text
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Component;

