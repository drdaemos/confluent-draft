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
            && this.props.collection.roles.fetched;
    },
    componentDidMount: function() {
        $('#' + this.state.id + ' .ui.dimmer').dimmer('show');
    },
    hideDimmer: function() {
        $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
    },
    componentDidUpdate: function() {
        if (this.isDataReady()) {
            this.hideDimmer();
        }
    },
    render: function() {
        var users = this.state.users;
        var roles = this.state.roles;
        var ready = isDataReady();
        return (
            <Widget width={'sixteen'} title={'Team'} id={this.state.id}>
                <div className='ui four column grid cards'>
                    {ready ?
                        users
                        .filter(
                            function (user) {
                                return user.deleted != 1;
                            })
                        .map(
                            function (user) {
                                var role = roles[1].role;
                                return (<Component.User user={user} key={user.id} role={role} />);
                            }
                        ) : ''
                    }
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
              <img src={'/images/avatar/large/' + this.props.user.id + '.jpg'}/>
            </a>
            <div className='content'>
              <a className='header'>{this.props.user.name}</a>
              <div className='meta'>
                <a>{this.props.role}</a>
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

