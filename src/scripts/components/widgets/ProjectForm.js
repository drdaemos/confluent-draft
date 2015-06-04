'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
  mixins: [backboneMixin],    
  formName: 'newproject-form',
  getInitialState: function() {
      return {id: _.uniqueId('newproject-')};
  },  
  isDataReady: function() {
      return this.props.collection.projects.fetched;
  },
  addFormActions: function() {
      var rules = {
        name: {
          identifier  : 'name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter project name'
            }
          ]
        },
        tag: {
          identifier  : 'tag',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter project tag'
            }
          ]
        },
        started_date: {
          identifier  : 'started_date',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter project start date'
            }
          ]
        },
      };

      var settings = {
        onSuccess: this.handleFormSubmit
      };

      $('#' + this.formName).form(rules, settings);
  },
  handleFormSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var started_date = React.findDOMNode(this.refs.started_date).value.trim();
    var tag = React.findDOMNode(this.refs.tag).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var client_data = React.findDOMNode(this.refs.client_data).value.trim();
    if (!name || !started_date || !tag) {
      return;
    }
    var formElem = '#' + this.formName;
    this.props.collection.projects.create(
      {        
        name: name, 
        state_id: 1,
        description: description,
        client_data: client_data,
        tag: tag,
        started_date: started_date,
        managed_id: window.app.session.user.get('id')
      }
    ); 
    window.app.router.navigate('#projects', {trigger: true});
  },
  componentDidMount: function() {
      if (!this.isDataReady()) {
          this.showDimmer();
      }
      this.addFormActions();
  },
  componentDidUpdate: function() { 
      if (this.isDataReady()) {   
          this.hideDimmer();
      }
  }, 
  showDimmer: function() {
    $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
  },
  hideDimmer: function() {
    $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
  },
  render: function() {
    return (
        <Widget width={'sixteen'} title={'New project'}>
            <form className='ui form' id={this.formName} > 

              <div className='three fields'>
                <div className='required three wide field'>
                  <label>Tag</label>
                  <div className='ui icon input'>
                    <input type='text' placeholder='Tag' name='tag' ref='tag' />
                    <i className='tag icon'></i>
                  </div>
                </div>
                <div className='required ten wide field'>
                  <label>Project name</label>
                  <div className='ui input'>
                    <input type='text' placeholder='Project name' name='name' ref='name' />
                  </div>
                </div>
                <div className='required three wide field'>
                  <label>Start date</label>
                  <div className='ui icon input'>
                    <input type='text' placeholder='Start date' name='started_date' ref='started_date' />
                    <i className='calendar icon'></i>
                  </div>
                </div>
              </div>
              <div className='two fields'>
                <div className='ten wide field'>
                  <label>Description</label>
                  <div className='ui input'>
                    <textarea name='description' ref='description' placeholder='Description'></textarea>
                  </div>
                </div>
                <div className='six wide field'>
                  <label>Client data</label>
                  <div className='ui input'>
                    <textarea placeholder='Client data' name='client_data' ref='client_data'></textarea>
                  </div>
                </div>

              </div>

              <div className='ui error message'>
                <div className='header'>We noticed some issues</div>
              </div>
              <div className='ui submit button'>Create</div>

            </form>
        </Widget>
    );
  }
});

module.exports = Component;

