'use strict';

var React = require('react');
var _ = require('underscore');
var Events = require('pubsub-js');
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
    onFiltersChanged: function( msg, data ) {
        this.setState({filters: data});
    },
    componentDidMount: function() {  
        this.filterToken = Events.subscribe('task-filter.changed', this.onFiltersChanged); 
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
        var states = this.props.collection.states;
        var users = this.props.collection.users;
        var comments = this.props.collection.comments;
        var projects = this.props.collection.projects;
        var filters = this.state.filters;
        var ready = this.isDataReady();
        return (
            <Widget width={'twelve'} title={'Tasks'} id={this.state.id}>
                <table className='ui striped table'>
                    <tbody>
                        {ready ?
                            tasks
                            .filter(
                                function (task) {
                                    var valid = task.deleted != 1;
                                    if (!_.isUndefined(filters)) {
                                        if (filters.project != 0) valid = (valid && task.project_id == filters.project);
                                        if (filters.assigned != 0) valid = (valid && task.assigned_id == filters.assigned);
                                        if (filters.state != 0) valid = (valid && task.state_id == filters.state);
                                    }
                                    return valid;
                                })
                            .map(
                                function (task) {
                                    task.assignee = users.tryGet(task.assigned_id, 'Not assigned', 'name');
                                    task.state = states.tryGet(task.state_id, 'Undefined', 'state');
                                    task.tag = projects.tryGet(task.project_id, 'WTF?', 'tag') + '-' + task.id;
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

