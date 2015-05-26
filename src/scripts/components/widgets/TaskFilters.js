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
        <Widget width={'four'} title={'Filters'}>
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
                <select className='ui search dropdown'>
                  <option value="">Anyone</option>
                  <option value="1">alive</option>
                  <option value="2">daemos</option>
                </select>
              </div>

              <div className='field'>
                <label>State</label>
                <select className='ui search dropdown'>
                  <option value="">Any state</option>
                  <option value="1">Star</option>
                  <option value="2">In progress</option>
                  <option value="3">Completed</option>
                  <option value="3">Approved</option>
                </select>
              </div>

            </div>
        </Widget>
    );
  }
});

module.exports = Component;

