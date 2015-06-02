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
        return {id: _.uniqueId('task-filter-')};
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
          $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
        }
    },
    componentDidUpdate: function() { 
        if (this.isDataReady()) {   
            this.hideDimmer();
        }
    },  
    hideDimmer: function() {
        $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
    },
    render: function() {        
        var tasks = this.state.tasks;
        var states = this.props.collection.states;
        var users = this.props.collection.users;
        var comments = this.props.collection.comments;
        var projects = this.props.collection.projects;
        var ready = this.isDataReady();
        return (
            <Widget width={'twelve'} title={'Tasks'}>
                <table className='ui striped table'>
                    <tbody>
                        {ready ?
                            tasks
                            .filter(
                                function (task) {
                                    return task.deleted != 1;
                                })
                            .map(
                                function (task) {
                                    task.assignee = !_.isUndefined(users.get(task.assigned_id))
                                                    ? users.get(task.assigned_id).get('name')
                                                    : 'Not assigned';
                                    task.state = !_.isUndefined(states.get(task.state_id))
                                                 ? states.get(task.state_id).get('state')
                                                 : 'Undefined';
                                    task.tag = !_.isUndefined(projects.get(task.project_id))
                                               ? projects.get(task.project_id).get('tag') + '-' + task.id
                                               : 'WTF?';
                                    task.comments = comments.where({task_id: task.id}).length;
                                    return (<Component.Row task={task} key={task.id} />);
                                }
                            ) : ''
                        }
                    </tbody>
                </table>
            </Widget>
        );
    }
});

Component.Row = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <div className='content'>
                      <a className='header' href="#task"> {this.props.task.tag + ' ' + this.props.task.name} </a>
                      <div className='description'> {this.props.task.description} </div>
                    </div>    
                </td>                
                <td>
                    <div className='content'>
                        {this.props.task.state}
                    </div>    
                </td>
                <td>
                    <div className='content'>
                        {this.props.task.assignee}
                    </div>    
                </td>
                <td>
                    <div className='ui labeled icon button'>
                        <i className='comments outline icon'></i> 
                        {this.props.task.comments}
                    </div> 
                </td>
            </tr>
        );
    }
});
module.exports = Component;

