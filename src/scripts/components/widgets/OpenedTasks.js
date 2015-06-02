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
      return {id: _.uniqueId('opened-')};
  },  
  isDataReady: function() {
      return this.props.collection.users.fetched
          && this.props.collection.tasks.fetched
          && this.props.collection.projects.fetched;
  },
  componentDidMount: function() {  
      if (!this.isDataReady()) {
          this.showDimmer();
      }
  },
  componentDidUpdate: function() { 
      if (this.isDataReady()) {   
          this.hideDimmer();
      }
  },  
  showDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
  },
  hideDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
  },
  render: function() {    
    var tasks = this.state.tasks;
    var users = this.props.collection.users;
    var projects = this.props.collection.projects;
    var ready = this.isDataReady();
    return (
	    <Widget width={'ten'} title={'Opened Tasks'} id={this.state.id}>
		    <div className='ui relaxed list'>
            {ready ?
                (_.isEmpty(
                    tasks
                    .filter(
                        function (task) {
                            return task.deleted != 1 
                                && task.state_id == 1 
                                && task.assigned_id == window.app.session.user.get('id');
                        })
                    .map(
                        function (task) {
                            task.tag = projects.tryGet(task.project_id, 'WTF?', 'tag') + '-' + task.id;
                            return (<Component.Item task={task} key={task.id} />);
                        }
                    )
                  ) ? 
                  <p> No such tasks for you </p>
                  : ''
                ) : ''
            }
        </div>
	    </Widget>
    );
  }
});

Component.Item = React.createClass({
    render: function() {
        return (
          <div className='item'>
            <i className='tag icon'></i>
            <div className='content'>
              <a className='header'> {this.props.task.tag + ' ' + this.props.task.name}  </a>
              <div className='description'> {this.props.task.description} </div>
            </div>
          </div>
        );
    }
});

module.exports = Component;

