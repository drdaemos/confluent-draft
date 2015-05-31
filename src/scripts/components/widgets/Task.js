'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
  render: function() {
    return (
	    <Widget width={'sixteen'} title={'DRAFT-1 Prepare UML Diagrams for a project'}>
        <div className='ui grid'>
          <div className='row'>
            <Component.Description />
            <Component.Properties />
          </div>
        </div>
	    </Widget>
    );
  }
});

Component.Properties = React.createClass({
  render: function() {
    var date = new Date().toDateString();
    return (
      <div className='six wide column'>
        <h3 className='ui dividing header'>Task info</h3>
        <table className='ui very basic table'>
          <tbody>
            <tr>
              <td>State</td>
              <td>In progress</td>
            </tr>

            <tr>
              <td>Assigned to</td>
              <td>daemos</td>
            </tr>

            <tr>
              <td>Created</td>
              <td>{date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

Component.Description = React.createClass({
  render: function() {
    return (
      <div className='ten wide column'>
        <div className='ui basic segment'>
          <p> Use Case, Classes, ER, Deployment and DFD are needed </p>
          <p>
            Tommy ruff, beaked sandfish common carp slimy sculpin manefish angler blue whiting, beardfish, spotted dogfish. Zander striped burrfish smelt barred danio, mooneye, glowlight danio Shingle Fish. Danio sawtooth eel monkfish featherfin knifefish New World rivuline Ragfish, silver hake. Skipping goby ronquil marblefish threespine stickleback slipmouth tadpole cod amur pike.
          </p>
          <p>
            Kaluga shiner Billfish pipefish nurseryfish Pacific cod, poolfish red velvetfish? Queen triggerfish ling cod. Ratfish Manta Ray dory sailfin silverside zebra trout?
          </p>
        </div>
        <Component.Comments />
      </div>
    );
  }
});

Component.Comments = React.createClass({
  render: function() {    
    var daemos = {
        name: 'DrDaemos',
        role: 'Developer',
        avatar: 'daemos.jpg'
    }
    var james = {
        name: 'Vasya',
        role: 'Project Manager',
        avatar: 'vasya.jpg'
    }
    var msg1 = {
        user: james,
        text: 'Testing comment #1',
        date: 'Yesterday at 12:40'
    }
    var msg2 = {
        user: daemos,
        text: 'Testing comment #2',
        date: 'Today at 11:23'
    }
    return (
        <div className='ui comments'>
          <h3 className='ui dividing header'>Comments</h3>

          <Component.Comments.Item message={msg1}/>          
          <Component.Comments.Item message={msg2}/>          
          
          <form className='ui reply form'>
            <div className='field'>
              <textarea></textarea>
            </div>
            <div className='ui blue labeled submit icon button'>
              <i className='icon edit'></i> Add Reply
            </div>
          </form>
        </div>
    );
  }
});

Component.Comments.Item = React.createClass({
  render: function() {
    return (
      <div className='comment'>
        <a className='avatar'>
          <img src={'/images/avatar/small/' + this.props.message.user.avatar}/>
        </a>
        <div className='content'>
          <a className='author'>{this.props.message.user.name}</a>
          <div className='metadata'>
            <span className='date'>{this.props.message.date}</span>
          </div>
          <div className='text'>
            <p>{this.props.message.text}</p>
          </div>
          <div className='actions'>
            <a className='reply'>Reply</a>
          </div>
        </div>    
      </div>
    );
  }
});

module.exports = Component;

