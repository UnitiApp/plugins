# Contributing


## Prerequisites ##
- You should be familiar with creating browser-based, web applications using technologies such as:
    - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    - [Bower](https://bower.io/)
    - [Backbone.js](http://backbonejs.org/)
    - [Require.js](http://requirejs.org/)
    - [Underscore.js](http://underscorejs.org/)
    - [jQuery](https://jquery.com/)
- **You'll need to have [Node 6 or greater](https://nodejs.org/en/download/) installed on your computer.**


## Setup ##
*Note:* Gulp is used to run specific tasks such as running tests, linting, etc so it will need to be installed prior to development. To get started, clone this repository into a folder by running:

`git clone git@github.com:UnitiApp/uniti-plugins.git`

Navigate into that directory and run the following commands:

- `npm install -g gulp-cli`
- `npm install -g bower`
- `npm install`
- `bower install`

**To begin writing a new plugin or make updates to an existing one, you'll want to have the [Uniti](https://github.com/UnitiApp/uniti) project checked out and setup a [bower link](https://bower.io/docs/api/#link) to this repository.**

## Anatomy of a plugin ##
Plugins are made up of [backbone views](http://backbonejs.org/#View). Dependencies of your plugin are dynamically included defining them with [RequireJS](http://requirejs.org/) and listing the dependencies of your plugin in the [bower.json file](https://github.com/UnitiApp/uniti-plugins/blob/master/bower.json).

- Plugins should make use of [bootstrap](http://getbootstrap.com/) for markup, css and components.
- Plugins should make use of [font-awesome](http://fontawesome.io/) for additional icons.
- Each plugin needs to inherit from the base [Plugin view](https://github.com/UnitiApp/uniti-plugins/blob/master/src/plugin.js).
- The order of methods called on your Plugin are as follows:
    - **initialize** - This method you will call the parent's constructor. This line `Plugin.prototype.initialize.apply(this, [options]);` needs to be the first line to run.
    - **ensureOptions** - This method is provided for you to validate the options required for your plugin to operate exist and are set with values.
    - **create** - This method will be called after your plugin is instantiated. This is a good area to do any setup for your plugin.
    - **render** - This method renders the template and returns it to the caller.
    - **destroy** - This method will be called when your plugin will be destoryed. This is a good area to do any cleaning up for your plugin.
- If you need any asyncronous calls to fetch data, you can proxy them to `/http`. This will make a call to the server, fetch the data and return the response. A good example of this usage is in the [weather-apixu plugin](https://github.com/UnitiApp/uniti-plugins/blob/master/src/weather-apixu/weather-apixu). You can also cache these calls so that repeated initialization to your plugin will not fetch fresh data from the resource.
- If you need any asyncronous calls to fetch data required of your plugin to render, it can trigger `this.trigger('re-render')` so the ui will be updated. A good example of this usage is in the [time plugin](https://github.com/UnitiApp/uniti-plugins/blob/master/src/time/time.js).
- If you need to provide additional functionality that's not provided by the bower components listed in the [bower.json](https://github.com/UnitiApp/uniti-plugins/blob/master/bower.json), you can add dependencies there.


## Example Plugin ##

An example plugin (template) is provided below and in the [src folder](https://github.com/UnitiApp/uniti-plugins/blob/master/src/hello-world) where all plugins reside.

```
define(function(require) {
    'use strict';

    var $ = require('jquery'), // jQuery
        _ = require('underscore'), // Underscore
        Backbone = require('backbone'), // Backbone
        Plugin = require('../plugin'), // Base plugin to extend
        CSS = require('css!./hello-world.css'), // CSS
        Template = require('text!./hello-world.html') // HTML template

    var DEFAULT_HELLO_WORLD_MESSAGE = 'Hello World!';

    return Plugin.extend({
        __NAME: 'hello-world', // Set the name of your plugin
        template: _.template(Template), // HTML template to present your data

        /**
         * This method gets called when the plugin is instantiated.
         */
        initialize: function(options) {
            Plugin.prototype.initialize.apply(this, [options]);
        },

        /**
         * This method will be called after your method is instantiated.
         * Use this method to confirm the options you need for your plugin to operate are properly set.
         */
        ensureOptions: function() {
            if (! _(this.options).has('message')) {
                this.options.message = DEFAULT_HELLO_WORLD_MESSAGE;
            }
        },
        
        /**
         * This method will be called after your plugin is instantiated.
         * This is a good area to do any setup for your plugin.
         */
        create: function() {

        },

        /**
         * This method will be called when your plugin will be destoryed.
         * This is a good area to do any cleaning up for your plugin.
         */
        destroy: function() {
            
        },
        
        /**
         * This method renders the template and returns it to the caller.
         */
        render: function() {
            return this.template({
                message: this.options.message
            });
        }
    });
});
```


## Writing tests for your plugin ##
When you've completed writing your plugin, you'll have to write tests for them. You do write tests right? You will not be able to have your plugin merged without tests. All tests for your plugin should reside in the [tests folder](https://github.com/UnitiApp/uniti-plugins/blob/master/tests/). If your tests need any mock data, you can provide them in the [mocks folder](https://github.com/UnitiApp/uniti-plugins/blob/master/tests/mocks/). There are also a series of steps that are run for testing your plugins. [ESLint](http://eslint.org/) for validating the syntax of your code and the [Jasmine](https://jasmine.github.io/) test suite for running your tests.


## Running tests ##
Running tests are easily done by executing the following command:

- `gulp test`

 
## Guidelines ##
- Be sure to include a README.md in your plugin's folder with some instructions on how to use it.
- A picture of the plugin operating in the README.md


