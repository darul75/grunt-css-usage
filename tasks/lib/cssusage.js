/*
 * grunt-css-usage
 * https://github.com/julienvalery/grunt-css-usage
 *
 * Copyright (c) 2014 darul75
 * Licensed under the MIT license.
 */

'use strict';

var env = require('jsdom').env;
var fs = require('fs');
var jade = require('jade');
var jsdom = require('jsdom').jsdom;
var path = require('path');
var parse = require('css-parse');
var $ = require("jquery")(jsdom().createWindow());

exports.init = function(grunt) {

  var exports = {
    usingGruntReporter: false
  };

  var extensions = ['.htm', '.html', '.jade'];

  // Run JSHint on the given files with the given options
  exports.cssusage = function(css, html, options, done) {
    var cliOptions = {
      verbose: grunt.option('verbose'),
    };
    
    var fileIdx = 0;
    var report = {
      results: {},
      csserrors: [],
      markupcompileerrors: []
    };    

    // 1) PARSE CSS
    css.forEach(function(css_filepath) {
      grunt.log.writeln('\nChecking css file: "' + css_filepath + '.\n');

      var selectors = [];

      var data = fs.readFileSync(css_filepath, {encoding:'utf8'});
      var output_obj = parse(data);
      //console.log(JSON.stringify(output_obj, null, 2));      

      output_obj.stylesheet.rules.forEach(function(rule) {
        if (rule.type !== 'comment') {
          rule.selectors.forEach(function(selector) {
            selectors.push(selector);            
          });          
        }

      });

      // 2) TEST USAGE
      grunt.log.writeln('\n- for markup files:\n');       
      html.forEach(function(filepath) {
        grunt.log.writeln('-- "' + filepath);

        var ext = path.extname(filepath); // check ext        

        if (!$.inArray(ext, extensions))
          return;
        
        report.html = filepath;

        var data = fs.readFileSync(filepath, {encoding:'utf8'});                      

        if (ext === '.jade') {
          try {
            data = jade.compile(data, {})();            
          }
          catch(e) {
            report.markupcompileerrors.push(e + ' while compiling view :"' + filepath + '"');
          }
        }


        var cxt = {};
        var dom = $(data);

        for (var i = 0;i<selectors.length;i++) {
          var selector = selectors[i];          

          try {
            var length = dom.find(selector).length;
            if (!report.results[selector])
              report.results[selector] = {count:length};
            else if (report.results[selector] && length > 0) {
              report.results[selector] = {count:report.results[selector].count+length};
            }
          }
          catch (e) {            
            report.csserrors.push(e + '\n -- for selector :"' + selector + '"');            
          }
          
        }
              
      });
      
    });        
    
    done(report);
  };

  return exports;
};
