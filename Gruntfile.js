'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'smchcn_oauth.min.js': ['scripts/bower_components/jquery/jquery.js',
                                  'scripts/bower_components/uuid-js/lib/uuid.js',
                                  'scripts/bower_components/cookies-js/src/cookies.js',
                                  'scripts/smchcn_oauth/namespace.js',
                                  'scripts/smchcn_oauth/config.js',
                                  'scripts/smchcn_oauth/cookie.js',
                                  'scripts/smchcn_oauth/browser_location.js',
                                  'scripts/smchcn_oauth/params.js',
                                  'scripts/smchcn_oauth/url_generator.js',
                                  'scripts/smchcn_oauth/token_validator.js',
                                  'scripts/smchcn_oauth/access_requester.js']
        }
      }
    }
  });

  grunt.registerTask('build', [
                     'uglify'
  ]);
};
