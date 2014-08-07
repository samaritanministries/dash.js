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
            '.tmp/js/scripts/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js',
            '.tmp/js/scripts/namespace.js',
            '.tmp/js/scripts/browser.js',
            '.tmp/js/scripts/samaritan_js/notify.js',
            '.tmp/js/scripts/samaritan_js/scroll.js',
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

  copy: {
    scripts: {
      src: [
        'js/scripts/namespace.js',
        'js/scripts/browser.js',
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
