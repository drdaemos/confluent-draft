'use strict';

var Backbone = require('backbone');
var Router = Backbone.Router.extend({
    initialize: function(){
        _.bindAll(this);
    },   

    show: function(view, options){
        // Every page view in the router should need a header.
        // Instead of creating a base parent view, just assign the view to this
        // so we can create it if it doesn't yet exist
        if(!this.headerView){
            this.headerView = new HeaderView({});
            this.headerView.setElement($(".header")).render();
        }

        // Close and unbind any existing page view
        if(this.currentView && _.isFunction(this.currentView.close)) this.currentView.close();

        // Establish the requested view into scope
        this.currentView = view;

        // Need to be authenticated before rendering view.
        // For cases like a user's settings page where we need to double check against the server.
        if (typeof options !== 'undefined' && options.requiresAuth){        
            var self = this;
            window.app.session.checkAuth({
                success: function(res){
                    // If auth successful, render inside the page wrapper
                    $('#page').html( self.currentView.render().$el);
                }, error: function(res){
                    self.navigate("/", { trigger: true, replace: true });
                }
            });

        } else {
            // Render inside the page wrapper
            $('#page').html(this.currentView.render().$el);
            //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
        }

    },

    switchTo: function(view) {
        var View = require('./views/' + view);
        var hasPushState = !!(window.history && history.pushState);
        if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
        else this.show(new View({}));
    },

    routes: {
        "": "start", // Пустой hash-тэг
        "login": "login",
    },

    start: function () {
        this.switchTo('MainPage');
    },

    login: function () {
        this.switchTo('LoginPage');
    }

});

module.exports = Router;