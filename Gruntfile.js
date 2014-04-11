/*
 * grunt-css-usage
 * https://github.com/darul75/grunt-css-usage
 *
 * Copyright (c) 2014 darul
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {

      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    cssusage: {        
      files: {
        expand: true,
        src: ['test/html/**/*.html', 'test/jade/**/*.jade'],        
        css: ['test/css/**/*.css', 'test/css2/**/*.css']
      }
    },    

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'cssusage']);

  // By default, lint and run all tests.
  //grunt.registerTask('default', ['jshint', 'test']);

};
