'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
  
var Component = React.createClass({
  render: function() {
    var options = this.props.options;
    var option = this.props.option;
    return (
	    <select className='ui search dropdown'>
        <option value={this.props.initial.value}>{this.props.initial.text}</option>
        {options
        .map(
            function (item) {
                return (<option value={item.id} key={_.uniqueId('selectoption-')}>{item[option]}</option>);
            }
        )}
      </select>
    );
  }
});

module.exports = Component;

