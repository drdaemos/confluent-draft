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
        </div>
        <Component.Comments />
      </div>
    );
  }
});

Component.Comments = React.createClass({
  render: function() {
    return (
        <div className='ui cards'>

          <div className='ui fluid card'>
            <div className='content'>
              <div className='header'>james</div>
              <div className='meta'>2 days ago</div>
              <div className='description'>
                <p>We need it very soon. The conference is due to 4th of June, we have got to be absolutely ready for this.</p>
              </div>
            </div>
            <div className='ui bottom attached button'>
              <i className='reply icon'></i>
              Reply
            </div>
          </div>

          <div className='ui fluid card'>
            <div className='content'>
              <div className='header'>daemos</div>
              <div className='meta'>1 days ago</div>
              <div className='description'>
                <p>ok. i am up to the task.</p>
              </div>
            </div>
            <div className='ui bottom attached button'>
              <i className='reply icon'></i>
              Reply
            </div>
          </div>

        </div>
    );
  }
});

module.exports = Component;

