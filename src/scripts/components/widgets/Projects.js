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
        <Widget width={'twelve'} title={'Projects'}>
            <table className='ui striped table'>
                <tbody>
                  <tr>
                    <td>
                        <div className='tag'> DRAFT </div>
                    </td>
                    <td>
                        <div className='content'>
                          <a className='header'> Confluent Draft </a>
                          <div className='description'> New project tracking system </div>
                        </div>    
                    </td>
                    <td>
                        <div className='managed-by'> james </div>
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='tasks icon'></i> 
                            3
                        </div> 
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='file icon'></i> 
                            0
                        </div> 
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <div className='tag'> TEST </div>
                    </td>
                    <td>
                        <div className='content'>
                          <a className='header'> Confluent Draft testing </a>
                          <div className='description'> Prepare test cases and testing automation </div>
                        </div>    
                    </td>
                    <td>
                        <div className='managed-by'> james </div>
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='tasks icon'></i> 
                            0
                        </div> 
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='file icon'></i> 
                            2
                        </div> 
                    </td>
                  </tr>
                </tbody>
            </table>
        </Widget>
    );
  }
});

module.exports = Component;

