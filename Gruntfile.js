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
            'js/scripts/bower_components/jquery/jquery.js',
            'js/scripts/bower_components/uuid-js/lib/uuid.js',
            'js/scripts/bower_components/cookies-js/src/cookies.js',
            'js/scripts/smchcn_oauth/namespace.js',
            'js/scripts/smchcn_oauth/config.js',
            'js/scripts/smchcn_oauth/cookie.js',
            'js/scripts/smchcn_oauth/browser_location.js',
            'js/scripts/smchcn_oauth/params.js',
            'js/scripts/smchcn_oauth/url_generator.js',
            'js/scripts/smchcn_oauth/token_validator.js',
            'js/scripts/smchcn_oauth/access_requester.js'
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
    }
  });

  grunt.registerTask('build:js',   ['uglify']);
  grunt.registerTask('build:sass', ['sass']);
  grunt.registerTask('build', ['build:js', 'build:sass']);
};
