'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
var Select = require('scripts/components/elements/Select');
  
var Component = React.createClass({
  mixins: [backboneMixin],
  getInitialState: function() {
    return {id: _.uniqueId('task-filter-')};
  },  
  isDataReady: function() {
      return this.props.collection.users.fetched
          && this.props.collection.states.fetched;
  },
  componentDidMount: function() {  
    if (!this.isDataReady()) {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
    } else {      
      $('#' + this.state.id + ' .search.dropdown').dropdown(); 
    }
  },
  componentDidUpdate: function() { 
    if (this.isDataReady()) {
        $('#' + this.state.id + ' .search.dropdown').dropdown();   
        this.hideDimmer();
    }
  },  
  hideDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
  },
  render: function() {    
    var users = this.state.users;
    var states = this.state.states;
    var ready = this.isDataReady();

    var assigned = {
      options: users
              .filter(
                function (user) {
                  return user.deleted != 1;
                }),
      option: 'name',
      initial: {
        value: "",
        text: "Anyone"
      }
    };

    var state = {
      options: states,
      option: 'state',
      initial: {
        value: "",
        text: "Any state"
      }
    };
    return (
        <Widget width={'four'} title={'Filters'} id={this.state.id}>
            <div className='ui form'> 

              <div className='field'>
                <label>Project</label>
                <select className='ui search dropdown'>
                  <option value="">All projects</option>
                  <option value="1">DRAFT</option>
                  <option value="2">TEST</option>
                </select>
              </div>

              <div className='field'>
                <label>Assigned to</label>
                {ready 
                 ? <Select {...assigned} />
                 : ''}
              </div>

              <div className='field'>
                <label>State</label>
                {ready 
                 ? <Select {...state} />
                 : ''}
              </div>

            </div>
        </Widget>
    );
  }
});

module.exports = Component;

