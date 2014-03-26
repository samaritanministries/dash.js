'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'dist/samaritan-js.min.js': [
            '.tmp/js/scripts/bower_components/uuid-js/lib/uuid.js',
            '.tmp/js/scripts/bower_components/cookies-js/src/cookies.js',
            '.tmp/js/scripts/namespace.js',
            '.tmp/js/scripts/browser.js',
            '.tmp/js/scripts/endpoints.js',
            '.tmp/js/scripts/samaritan_js/oauth/cookie.js',
            '.tmp/js/scripts/samaritan_js/oauth/params.js',
            '.tmp/js/scripts/samaritan_js/oauth/url_generator.js',
            '.tmp/js/scripts/samaritan_js/oauth/token_accessor.js',
            '.tmp/js/scripts/samaritan_js/oauth/token_refresh_iframe.js',
            '.tmp/js/scripts/samaritan_js/oauth/token_validator.js',
            '.tmp/js/scripts/samaritan_js/oauth/access_requester.js',
            '.tmp/js/scripts/samaritan_js/oauth/auto_refresh.js',
            '.tmp/js/scripts/samaritan_js/oauth/response.js'
          ]
        }
      }
    },

  sass: {
    dist: {
      files: {
        'dist/framework.css' : 'css/framework.css/sass/framework.scss'
      }
    }
  },

  copy: {
    scripts: {
      src: [
        'js/scripts/namespace.js',
        'js/scripts/browser.js',
        'js/scripts/bower_components/jquery/jquery.js',
        'js/scripts/bower_components/uuid-js/uuid.js',
        'js/scripts/bower_components/cookies-js/src/cookies.js',
        'js/scripts/samaritan_js/**/*.js',
      ],
      dest: '.tmp/'
    },
    prodEndpoints: {
      files: [{
        expand: true,
        rename: function(dest, src) {
          return dest + 'endpoints.js';
        },
        cwd: 'js/scripts/config/',
        src: ['prod_endpoints.js'],
        dest: '.tmp/js/scripts/'
      }]
    },
    sandboxEndpoints: {
      files: [{
        expand: true,
        rename: function(dest, src) {
          return dest + 'endpoints.js';
        },
        cwd: 'js/scripts/config/',
        src: ['sandbox_endpoints.js'],
        dest: '.tmp/js/scripts/'
      }]
    }
  },

  clean: {
    all: '.tmp'
  }

  });

  grunt.registerTask('build:js', [
                     'clean',
                     'copy:scripts',
                     'copy:prodEndpoints',
                     'uglify'
  ]);

  grunt.registerTask('build:sandboxJs', [
                     'clean',
                     'copy:scripts',
                     'copy:sandboxEndpoints',
                     'uglify'
  ]);
  grunt.registerTask('build:sass', ['sass']);
  grunt.registerTask('build', ['build:js', 'build:sass']);
};
