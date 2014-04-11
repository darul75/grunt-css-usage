/*
 * grunt-css-usage
 * https://github.com/julienvalery/grunt-css-usage
 *
 * Copyright (c) 2014 darul75
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

    var markups = [];
    var csss = [];

    this.files.forEach(function(f) {       

      // MARKUPS DIGEST
      var files = f.src.filter(function(filepath) {
          
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;          
          }  
      });

      // CSS  
      var css = grunt.file.expand({filter: 'isFile'}, f.css);
      css.forEach(function(f) {
        if (csss.indexOf(f) < 0) {
          csss.push(f);
        }  
      });

      
      Array.prototype.push.apply(markups, files);      

    });
    
    
    // START PROCESS
    cssusage.cssusage(csss, markups, {}, function(report) {
      var used_css = [];
      var unused_css = [];

      for (var key in report.results) {          
        var count = report.results[key].count;
        if (count === 0) {
          unused_css.push(key);
        }
        else {
         used_css.push('"' +key + '", count: ' + count); 
        }
      }

      if (used_css) {
        grunt.log.writeln('\n*************************************************************');
        grunt.log.writeln('****************** USED CSS RULES COUNT ***********************');
        grunt.log.writeln('*************************************************************\n');
        grunt.log.writeln("List by CSS selector: \n");
      }
      
      used_css.forEach(function(count) {
        grunt.log.writeln('-- ' + count);
      });

      if (unused_css) {
        grunt.log.writeln('\n*************************************************************');
        grunt.log.writeln('****************** UNUSED POSSIBLE CSS RULES ****************');
        grunt.log.writeln('*************************************************************\n');
        grunt.log.writeln("List by CSS selector: \n");
      }
      unused_css.forEach(function(selector) {
        grunt.log.writeln('-- "' + selector + '"');
      });

      if (report.csserrors) {
        grunt.log.writeln('\n*************************************************************');
        grunt.log.writeln('********************** CSS ERRORS ***************************');
        grunt.log.writeln('*************************************************************\n');
      }

      report.csserrors.forEach(function(csserror) {          
        grunt.log.writeln('- ' + csserror);
      });

    });  
        
  });

};
