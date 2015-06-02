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
        return {id: _.uniqueId('projects-')};
    },  
    isDataReady: function() {
        return this.props.collection.users.fetched
            && this.props.collection.tasks.fetched
            && this.props.collection.states.fetched
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
        var tasks = this.props.collection.tasks;
        var states = this.props.collection.states;
        var users = this.props.collection.users;
        var projects = this.state.projects;
        var ready = this.isDataReady();
        return (
            <Widget width={'twelve'} title={'Projects'} id={this.state.id}>
                <table className='ui striped table'>
                    <tbody>
                        {ready ?
                            projects
                            .filter(
                                function (project) {
                                    return project.deleted != 1;
                                })
                            .map(
                                function (project) {
                                    project.manager = users.tryGet(project.managed_id, 'Not managed', 'name');
                                    project.state = states.tryGet(project.state_id, 'Undefined', 'state');
                                    project.tasks = tasks.where({project_id: project.id}).length;
                                    return (<Component.Row project={project} key={project.id} />);
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
                    <div className='tag'> {this.props.project.tag} </div>
                </td>
                <td>
                    <div className='content'>
                      <a className='header'> {this.props.project.name} </a>
                      <div className='description'> {this.props.project.description} </div>
                    </div>    
                </td>                
                <td>
                    <div className='managed-by'> {this.props.project.state} </div>
                </td>
                <td>
                    <div className='managed-by'> {this.props.project.manager} </div>
                </td>
                <td>
                    <div className='ui labeled icon button'>
                        <i className='tasks icon'></i> 
                        {this.props.project.tasks}
                    </div> 
                </td>
                <td>
                    <div className='ui labeled icon button'>
                        <i className='file icon'></i> 
                        0
                    </div> 
                </td>
            </tr>
        );
    }
});

module.exports = Component;

