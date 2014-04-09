/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

var env = require('jsdom').env;
var fs = require('fs');
var jsdom = require('jsdom').jsdom;
var $ = require("jquery")(jsdom().createWindow());

var parse = require('css-parse');
var path = require('path');

exports.init = function(grunt) {
  var exports = {
    usingGruntReporter: false
  };

  var pad = function(msg,length) {
    while (msg.length < length) {
      msg = ' ' + msg;
    }
    return msg;
  };


  // Run JSHint on the given files with the given options
  exports.cssusage = function(css, html, options, done) {
    var cliOptions = {
      verbose: grunt.option('verbose'),
    };
    
    var fileIdx = 0;
    var report = {
      results: {},
      csserrors: []
    };    

    // 1) PARSE CSS
    css.forEach(function(path) {
      grunt.log.writeln('Checking css file: "' + path + '.');

      var selectors = [];      

      var data = fs.readFileSync(path, {encoding:'utf8'});      
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
      html.forEach(function(path) {
        grunt.log.writeln('Parsing markup file: "' + path + '.');
        
        report.html = path; // html path

        var data = fs.readFileSync(path, {encoding:'utf8'});                      
        var cxt = {};

        for (var i = 0;i<selectors.length;i++) {
          var selector = selectors[i];          

          try {
            var length = $(data).find(selector).length;
            if (!report.results[selector])
              report.results[selector] = {count:length};
            else if (report.results[selector] && length > 0) {
              report.results[selector] = {count:length};
            }
          }
          catch (e) {            
            report.csserrors.push(e + ' for selector :"' + selector + '"');            
          }
          
        }
              
      });
      
    });        
    
    done(report);
  };

  return exports;
};
