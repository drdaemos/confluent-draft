'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
  mixins: [backboneMixin],
  getInitialState: function() {
      return {id: _.uniqueId('tasks-')};
  },  
  isDataReady: function() {
      return this.props.collection.users.fetched
          && this.props.collection.tasks.fetched
          && this.props.collection.states.fetched
          && this.props.collection.projects.fetched
          && this.props.collection.comments.fetched;
  },
  componentDidMount: function() {  
      if (!this.isDataReady()) {
          this.showDimmer();
      }
  },
  componentWillUpdate: function() {    
      if (this.isDataReady()) {     
        var data = this.getDataFromQuery();
        console.log(data);
        if(_.isUndefined(data)){          
          window.app.router.notFound();
        }
      }
  },
  componentDidUpdate: function() { 
      if (this.isDataReady()) {     
        this.hideDimmer();
      }
  },
  getDataFromQuery: function() {
    var query = this.splitTag(this.props.query.tag);
    var project = this.props.collection.projects.findWhere({tag: query.project});

    if (!_.isUndefined(project)) {
        var task = this.props.collection.tasks.findWhere({
          id: query.task, project_id: project.get('id') 
        });
      if (!_.isUndefined(task)) {
        var state = this.props.collection.states.tryGet(task.get('state_id'), 'Undefined');
        var assignee = this.props.collection.users.tryGet(task.get('assigned_id'), 'Not assigned');
        return {
          task: task,
          project: project,
          state: state,
          assignee: assignee
        };
      } else return;
    } else return;
  },
  splitTag: function(tag) {
    return {
      project: tag.split('-',2)[0],
      task: tag.split('-',2)[1],      
    };
  },
  showDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
  },
  hideDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
  },
  render: function() {
    var title = 'Task';    
    var ready = this.isDataReady();
    var data = this.getDataFromQuery();
    if (ready && !_.isUndefined(data)) {
      var title = data.project.get('tag') + '-' + data.task.get('id') + ' ' + data.task.get('name');
    }
    return (
	    <Widget width={'sixteen'} title={title}>
        <div className='ui grid'>
          {ready 
            ?
            <div className='row'>
              <Component.Description data={data} />
              <Component.Properties data={data} />              
            </div> 
            :
            <div className='row'>
              <p>Please wait while data is being loaded </p>
            </div> 
          }
        </div>
	    </Widget>
    );
  }
});

Component.Properties = React.createClass({
  render: function() {
    var date = new Date(this.props.data.task.get('started_date')).toDateString();
    var estimation = this.props.data.task.get('estimation') + ' minutes'; 
    var progress = this.props.data.task.get('progress') + ' minutes'; 
    return (
      <div className='six wide column'>
        <h3 className='ui dividing header'>Task info</h3>
        <table className='ui very basic table'>
          <tbody>
            <tr>
              <td>State</td>
              <td>{this.props.data.state.get('state')}</td>
            </tr>

            <tr>
              <td>Assigned to</td>
              <td>{this.props.data.assignee.get('name')}</td>
            </tr>

            <tr>
              <td>Started</td>
              <td>{date}</td>
            </tr>

            <tr>
              <td>Estimation</td>
              <td>{estimation}</td>
            </tr>

            <tr>
              <td>Progress</td>
              <td>{progress}</td>
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

