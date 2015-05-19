'use strict';

var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
global.$ = require('jquery');
global.jQuery = global.$;

require('react-backbone/with-deps')(React, Backbone, _, $);
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

Session = require('./models/session');

// Global event aggregator
window.app.eventAggregator = _.extend({}, Backbone.Events);

// View.close() event for garbage collection
Backbone.View.prototype.close = function() {
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
};

// Enabling router
window.app.router = require('./router');
new window.app.router();

// Enabling session
window.app.session = new Session();

// Check the auth status upon initialization,
// before rendering anything or matching routes
window.app.session.checkAuth({

    // Start the backbone routing once we have captured a user's auth status
    complete: function(){

        // HTML5 pushState for URLs without hashbangs
        var hasPushstate = !!(window.history && history.pushState);
        if(hasPushstate) Backbone.history.start({ pushState: true, root: '/' });
        else Backbone.history.start();

    }
});

Backbone.history.start();  // Запускаем HTML5 History push 