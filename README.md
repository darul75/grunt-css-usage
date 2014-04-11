# grunt-css-usage

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

-- For markup file: "test/html/sub/sub.html.

-- For markup file: "test/html/test.html.

-- For markup file: "test/html/test1.html.

-- For markup file: "test/jade/jade1.jade.


Checking css file: "test/css/test.css.

-- For markup file: "test/html/sub/sub.html.

....

***********************************************************
**************** USED CSS RULES COUNT *********************
***********************************************************

rule "DIV.user-badge", count: 2
rule ".map", count: 1
rule "body", count: 1
rule "i.service-icon", count: 1

***********************************************************
**************** UNUSED POSSIBLE CSS RULES **************
***********************************************************

>> rule "DIV.user-badge DIV.title" may not be used anywhere in your app.
>> rule ".users-list-item" may not be used anywhere in your app.
>> rule ".media-image" may not be used anywhere in your app.
>> rule ".media-left" may not be used anywhere in your app.
>> rule ".ministats-group" may not be used anywhere in your app.
>> rule ".ministats-group > .ministats-item" may not be used anywhere in your app.

...

***********************************************************
******************** CSS ERRORS *************************
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
