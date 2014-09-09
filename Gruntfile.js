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
          'dist/dash.min.js': [
            '.tmp/js/scripts/bower_components/uuid-js/lib/uuid.js',
            '.tmp/js/scripts/bower_components/cookies-js/src/cookies.js',
            '.tmp/js/scripts/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js',
            '.tmp/js/scripts/namespace.js',
            '.tmp/js/scripts/dash/browser.js',
            '.tmp/js/scripts/dash/notify.js',
            '.tmp/js/scripts/dash/scroll.js',
            '.tmp/js/scripts/dash/oauth/cookie.js',
            '.tmp/js/scripts/dash/oauth/params.js',
            '.tmp/js/scripts/dash/oauth/url_generator.js',
            '.tmp/js/scripts/dash/oauth/token_accessor.js',
            '.tmp/js/scripts/dash/oauth/token_refresh_iframe.js',
            '.tmp/js/scripts/dash/oauth/token_validator.js',
            '.tmp/js/scripts/dash/oauth/access_requester.js',
            '.tmp/js/scripts/dash/oauth/auto_refresh.js',
            '.tmp/js/scripts/dash/oauth/response.js',
            '.tmp/js/scripts/dash/redirector.js'
          ]
        }
      }
    },

  copy: {
    scripts: {
      src: [
        'js/scripts/namespace.js',
        'js/scripts/dash/browser.js',
        'js/scripts/bower_components/jquery/jquery.js',
        'js/scripts/bower_components/uuid-js/lib/uuid.js',
        'js/scripts/bower_components/cookies-js/src/cookies.js',
        'js/scripts/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js',
        'js/scripts/samaritan_js/**/*.js',
      ],
      dest: '.tmp/'
    }
  },

  clean: {
    all: '.tmp'
  }

  });

  grunt.registerTask('build:js', [
                     'clean',
                     'copy:scripts',
                     'uglify'
  ]);
  grunt.registerTask('build', ['build:js']);
};
