'use strict';

var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Application = require('scripts/components/Application');    
var Router = Backbone.Router.extend({
    el: 'page',
    initialize: function(){
    },   

    show: function(options){
        var props = {
            page: options.page,
            query: options.query
        };

        if (typeof options !== 'undefined' && options.requiresAuth){        
            var self = this;
            window.app.session.checkAuth({
                success: function(res){
                    // If auth successful, render inside the page wrapper
                    React.render(<Application {...props} key={props.page}/>, document.getElementById(self.el));
                }, error: function(res){
                    self.navigate("login", { trigger: true });
                }
            });

        } else {
            React.render(<Application {...props} />, document.getElementById(this.el));
        }
    },

    routes: {
        "": "start", // Пустой hash-тэг
        "login": "login",
        "logout": "logout",
        "signup": "signup",
        "dashboard": "start",
        "tasks": "tasks",
        "task/:tag": "task",
        "projects": "projects",
        "newproject": "newproject",
        "team": "team",
        "profile(/:user)": "profile",
        "*path": "notFound"
    },

    start: function () {
        this.show({
            page: 'Dashboard',
            requiresAuth: true
        });
    },

    tasks: function () {
        this.show({
            page: 'Tasks',
            requiresAuth: true
        });
    },

    task: function (tag) {
        this.show({
            page: 'Task',
            requiresAuth: true,
            query: {
                tag: tag
            }
        });
    },

    projects: function () {
        this.show({
            page: 'Projects',
            requiresAuth: true
        });
    },

    newproject: function () {
        this.show({
            page: 'NewProject',
            requiresAuth: true
        });
    },

    team: function () {
        this.show({
            page: 'Team',
            requiresAuth: true
        });
    },

    profile: function (user) {
        this.show({
            page: 'Profile',
            requiresAuth: true,
            query: {
                user: user
            }
        });
    },

    login: function () {
        this.show({
            page: 'Login'
        });
    },

    logout: function () {
        window.app.session.logout({}, {
          success: function(res){
              window.app.router.navigate("login", { trigger: true });
          }
        });
    },

    signup: function () {
        this.show({
            page: 'Signup'
        });
    },

    notFound: function () {
        this.show({
            page: 'NotFound'
        });
    }

});

_.bindAll(Router, _.functions(Router));

module.exports = Router;