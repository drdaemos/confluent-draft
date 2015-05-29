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
        <Widget width={'twelve'} title={'Tasks'}>
            <table className='ui striped table'>
                <tbody>
                  <tr>
                    <td>
                        <div className='ui yellow icon button'>
                            <i className='tag icon'></i>
                        </div>
                    </td>
                    <td>
                        <div className='content'>
                          <a className='header' href="#task"> DRAFT-1 Prepare UML Diagrams for a project </a>
                          <div className='description'> Use Case, Classes, ER, Deployment and DFD are needed </div>
                        </div>    
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='comments outline icon'></i> 
                            4
                        </div> 
                    </td>
                    <td>
                        <div className='ui red labeled icon button'>
                            <i className='remove icon'></i> 
                            Remove
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <div className='ui yellow icon button'>
                            <i className='tag icon'></i>
                        </div>
                    </td>
                    <td>
                        <div className='content'>
                          <a className='header'> DRAFT-2 Describe program business model and processes </a>
                          <div className='description'> A few pages should be enough. </div>
                        </div>    
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='comments outline icon'></i> 
                            6
                        </div>
                    </td>
                    <td>
                        <div className='ui red labeled icon button'>
                            <i className='remove icon'></i> 
                            Remove
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <div className='ui yellow icon button'>
                            <i className='tag icon'></i>
                        </div>
                    </td>
                    <td>
                        <div className='content'>
                          <a className='header'> DRAFT-3 Configure build system </a>
                          <div className='description'>I recommend using grunt, look for some examples at blabla.com </div>
                        </div>    
                    </td>
                    <td>
                        <div className='ui labeled icon button'>
                            <i className='comments outline icon'></i> 
                            1
                        </div>
                    </td>
                    <td>
                        <div className='ui red labeled icon button'>
                            <i className='remove icon'></i> 
                            Remove
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

