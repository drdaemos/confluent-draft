'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,

      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/',
      },

      start: {
        keepAlive: true,
      }
    },

    connect: {
      options: {
        port: 8000
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://confluent-draft:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://confluent-draft:<%= connect.options.port %>/'
      }
    },

    chmod: {
      options: {
        mode: '777'
      },
      api: {
        src: ['dist/api/app/logs/**', 'dist/api/app/config/**']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      api: {
        files: [
          {
            expand: true,
            cwd: '<%= pkg.src %>/api/',
            src: ['**'],
            dest: '<%= pkg.dist %>/api/',
            dot: true
          }
        ]
      },
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            expand: true,
            cwd: '<%= pkg.src %>/images/',
            src: ['**'],
            dest: '<%= pkg.dist %>/images/'
          }
        ]
      }
    },

    clean: {
      api: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>/api',
            '!<%= pkg.dist %>/**/*.db'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>',
            '!<%= pkg.dist %>/**/*.db'
          ]
        }]
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    }

    grunt.task.run([
      'open:dev',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', ['clean', 'copy', 'chmod', 'webpack']);

  grunt.registerTask('build-api', ['clean:api', 'copy:api', 'chmod'])

  grunt.registerTask('default', ['build']);
};
