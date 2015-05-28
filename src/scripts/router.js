'use strict';

var Backbone = require('backbone');
var _ = require('underscore');
var Router = Backbone.Router.extend({
    el: $('#page'),
    initialize: function(){
    },   

    show: function(view, options){
        // Every page view in the router should need a header.
        // Instead of creating a base parent view, just assign the view to this
        // // so we can create it if it doesn't yet exist
        // if(!this.headerView){
        //     this.headerView = new HeaderView({});
        //     this.headerView.setElement($(".header")).render();
        // }

        // Close and unbind any existing page view
        //if(this.currentView && _.isFunction(this.currentView.close)) this.currentView.close();
        this.el.empty();

        // Establish the requested view into scope
        this.currentView = view;

        // Need to be authenticated before rendering view.
        // For cases like a user's settings page where we need to double check against the server.
        if (typeof options !== 'undefined' && options.requiresAuth){        
            var self = this;
            window.app.session.checkAuth({
                success: function(res){
                    // If auth successful, render inside the page wrapper
                    self.el.html( self.currentView.render());
                }, error: function(res){
                    self.navigate("login", { trigger: true });
                }
            });

        } else {
            // Render inside the page wrapper
            this.el.html(this.currentView.render());
            //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
        }

    },

    switchTo: function(view, options) {
        var View = require('./views/' + view);
        // var hasPushState = !!(window.history && history.pushState);
        // if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
        //else 
        var view = new View();
        this.show(view, options);
        this.globalCalls();
        if (typeof(view.jsCalls) == 'function') view.jsCalls();
    },

    globalCalls: function() {
        $('.dropdown').dropdown();
    },

    routes: {
        "": "start", // Пустой hash-тэг
        "login": "login",
        "dashboard": "start",
        "tasks": "tasks",
        "task": "task",
        "projects": "projects",
        "*path": "notFound"
    },

    start: function () {
        this.switchTo('DashboardPage', {
            requiresAuth: true
        });
    },

    tasks: function () {
        this.switchTo('TasksPage', {
            requiresAuth: true
        });
    },

    task: function () {
        this.switchTo('TaskPage', {
            requiresAuth: true
        });
    },

    projects: function () {
        this.switchTo('ProjectsPage', {
            requiresAuth: true
        });
    },

    login: function () {
        this.switchTo('LoginPage');
    },

    notFound: function () {
        this.switchTo('NotFoundPage');
    }

});

_.bindAll(Router, _.functions(Router));

module.exports = Router;