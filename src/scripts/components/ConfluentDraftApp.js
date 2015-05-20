'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');
  
var ConfluentDraftApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
          <img src={imageURL} />
          <p> {this.props.message}</p>
      </div>
    );
  }
});

module.exports = ConfluentDraftApp;

