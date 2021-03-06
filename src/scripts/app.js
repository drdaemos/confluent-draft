'use strict';

var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
global.$ = require('jquery');
global.jQuery = global.$;

require('scripts/libs/backbone-fetching-collection');
require('semantic-ui');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

window.app = {
    views: {},
    models: {},
    collections : {},
    root : "/",
    URL : "/",
    API : "/api", 
};

var Session = require('scripts/models/Session');
var Router = require('./router');

// Global event aggregator
window.app.eventAggregator = _.extend({}, Backbone.Events);

// Enabling router
window.app.router = new Router();

// Enabling session
window.app.session = new Session();

// Check the auth status upon initialization,
// before rendering anything or matching routes
window.app.session.checkAuth({

    // Start the backbone routing once we have captured a user's auth status
    complete: function(){
        //require allllllll collections        
        var Tasks = require('scripts/collections/Tasks');
        var TaskStates = require('scripts/collections/TaskStates');
        var Users = require('scripts/collections/Users');
        var TaskComments = require('scripts/collections/TaskComments');
        var Projects = require('scripts/collections/Projects');
        var Roles = require('scripts/collections/Roles');
        var ProjectStates = require('scripts/collections/ProjectStates');   

        window.app.collections.tasks = new Tasks();     
        window.app.collections.taskStates = new TaskStates();     
        window.app.collections.users = new Users();     
        window.app.collections.taskComments = new TaskComments();     
        window.app.collections.projects = new Projects();     
        window.app.collections.roles = new Roles();     
        window.app.collections.projectStates = new ProjectStates();     

        Backbone.history.start();

        // HTML5 pushState for URLs without hashbangs
        // var hasPushstate = !!(window.history && history.pushState);
        // if(hasPushstate) Backbone.history.start({ pushState: true, root: '/' });
        // else 
    }
});


