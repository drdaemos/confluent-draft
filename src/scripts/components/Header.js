'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('../../styles/header.less');
  
var Header = React.createClass({
  render: function() {
    return (
      <header className='header'>
      	<p>Диплом, который пишет не Джек.</p>
      </header>
    );
  }
});

module.exports = Header;

