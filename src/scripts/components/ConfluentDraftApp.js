'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');
  
var ConfluentDraftApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
          <p> {this.props.message}</p>
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = ConfluentDraftApp;

