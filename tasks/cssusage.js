/*
 * grunt-css-usage
 * https://github.com/julienvalery/grunt-css-usage
 *
 * Copyright (c) 2014 darul
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var cssusage = require('./lib/cssusage').init(grunt);

  grunt.registerMultiTask('cssusage', 'CSS usage', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });    

    this.files.forEach(function(f) {       

      // HTML
      var markups = f.src.filter(function(filepath) {              
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;          
          }  
      });

      // CSS  
      var css = grunt.file.expand({filter: 'isFile'}, f.css);

      cssusage.cssusage(css, markups, {}, function(report) {
        var unused_css = [];

        for (var key in report.results) {          
          var count = report.results[key].count;
          if (count === 0) {
            unused_css.push(key);
          }
        }

        if (unused_css) {
          grunt.log.writeln('\n*************************************************************');
          grunt.log.writeln('****************** UNUSED POSSIBLE CSS RULES ****************');
          grunt.log.writeln('*************************************************************\n');
        }
        unused_css.forEach(function(selector) {
          grunt.log.warn('rule "' + selector + '" may not be used anywhere in your app.');
        });

        if (report.csserrors) {
          grunt.log.writeln('\n*************************************************************');
          grunt.log.writeln('********************** CSS ERRORS ***************************');
          grunt.log.writeln('*************************************************************\n');
        }

        report.csserrors.forEach(function(csserror) {          
          grunt.log.errorlns(csserror);
        });

      });

    });
  });

};
