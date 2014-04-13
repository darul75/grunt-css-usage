# grunt-css-usage [![NPM version](https://badge.fury.io/js/grunt-css-usage.svg)](http://badge.fury.io/js/grunt-css-usage) [![Build Status](https://travis-ci.org/darul75/grunt-css-usage.png?branch=master)](https://travis-ci.org/darul75/grunt-css-usage) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/grunt-css-usage/counters/views.png)](https://sourcegraph.com/github.com/darul75/grunt-css-usage) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/darul75/grunt-css-usage/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

> CSS usage, check your css rules usage

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-usage --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-usage');
```

## Cssusage task
_Run this task with the `grunt cssusage` command._

### Overview
In your project's Gruntfile, add a section named `cssusage` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cssusage: {
    options: {
      // TODO
    },
    files: {
      src: ['dir/html/**/*.html', 'dir/jade/**/*.jade'], // some html, jade files directories        
      css: ['dir/css/**/*.css', 'dir/css2/**/*.css']     // some css files directories
    }
  },
});
```

### Options

TODO

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  cssusage: {
    options: {},
    files: {
      src: ['test/html/**/*.html', 'test/jade/**/*.jade'],        
      css: ['test/css/**/*.css', 'test/css2/**/*.css']
    }
  },
});
```

### Console output example

```
Checking css file: "test/css/sub/sub.css.

- for markup files:

-- "test/html/sub/sub.html
-- "test/html/test.html
-- "test/html/test1.html
-- "test/jade/jade1.jade


Checking css file: "test/css/test.css.

....

***********************************************************
**************** USED CSS RULES COUNT *********************
***********************************************************

List by CSS selector:

-- "DIV.user-badge", count: 2
-- ".map", count: 1
-- "body", count: 1
-- "i.service-icon", count: 1

***********************************************************
**************** UNUSED POSSIBLE CSS RULES ****************
***********************************************************

List by CSS selector:

-- "DIV.user-badge DIV.title"
-- ".users-list-item"
-- ".media-image"
-- ".media-left"
-- ".ministats-group"
-- ".ministats-group > .ministats-item"
-- ".ministats-group .ministats-small"
-- "a.ministats"
-- "a.ministats:hover"
-- ".list-nostyle"
-- ".type-light"
-- ".truncate"
-- "a:hover.link-dark"

...

***********************************************************
******************** CSS ERRORS ***************************
***********************************************************

>> Error: Syntax error, unrecognized expression: unsupported pseudo: hover for
>> selector :"html.cssanimations.no-touch #sideBar:hover"
>> Error: Syntax error, unrecognized expression: unsupported pseudo: hover for
>> selector :"html.cssanimations.no-touch:hover #sideBar.searching"
>> Error: Syntax error, unrecognized expression: unsupported pseudo: hover for
>> selector :"html.cssanimations.no-touch #sideBar:hover li .cover"
>> Error: Syntax error, unrecognized expression: unsupported pseudo: after for
>> selector :"label .required:after"



```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
_2014-04-11   v0.0.1_   First version, html + jade templates
