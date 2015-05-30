'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
  getInitialState: function() {
    return {id: _.uniqueId('project-filter-')};
  },
  componentDidMount: function() { 
    $('#' + this.state.id + ' .search.dropdown').dropdown();
  },
  componentDidUpdate: function() {
    $('#' + this.state.id + ' .search.dropdown').dropdown();
  },
  render: function() {
    return (
        <Widget width={'four'} title={'Filters'} id={this.state.id}>
            <div className='ui form'> 

              <div className='field'>
                <label>Managed by</label>
                <select className='ui search dropdown'>
                  <option value="">Anyone</option>
                  <option value="3">james</option>
                </select>
              </div>

              <div className='field'>
                <label>State</label>
                <select className='ui search dropdown'>
                  <option value="">Any state</option>
                  <option value="1">On hold</option>
                  <option value="2">In progress</option>
                  <option value="3">Finished</option>
                </select>
              </div>

            </div>
        </Widget>
    );
  }
});

module.exports = Component;

