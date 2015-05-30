'use strict';

var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
global.$ = require('jquery');
global.jQuery = global.$;

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
        Backbone.history.start();

        // HTML5 pushState for URLs without hashbangs
        // var hasPushstate = !!(window.history && history.pushState);
        // if(hasPushstate) Backbone.history.start({ pushState: true, root: '/' });
        // else 
    }
});
