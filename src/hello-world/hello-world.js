define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Plugin = require('../plugin'),
        CSS = require('css!./hello-world.css'),
        Template = require('text!./hello-world.html');

    var DEFAULT_HELLO_WORLD_MESSAGE = 'Hello World!';

    return Plugin.extend({
        __NAME: 'hello-world',
        template: _.template(Template),

        /**
         * This method gets called when the plugin is instantiated.
         *
         * @param {object} options - options for this plugin
         * @returns {void}
         */
        initialize: function(options) {
            Plugin.prototype.initialize.apply(this, [options]);
        },

        /**
         * This method will be called after your method is instantiated.
         * Use this method to confirm the options you need for your plugin
         * to operate are properly set.
         *
         * @returns {void}
         */
        ensureOptions: function() {
            if (!_(this.options).has('message')) {
                this.options.message = DEFAULT_HELLO_WORLD_MESSAGE;
            }
        },

        /**
         * This method will be called after your plugin is instantiated.
         * This is a good area to do any setup for your plugin.
         *
         * @returns {void}
         */
        create: function() {
            // Create stuff here.
        },

        /**
         * This method will be called when your plugin will be destoryed.
         * This is a good area to do any cleaning up for your plugin.
         *
         * @returns {void}
         */
        destroy: function() {
            // Destory stuff here.
        },

        /**
         * This method renders the template and returns it to the caller.
         *
         * @returns {string} html markup
         */
        render: function() {
            return this.template({message: this.options.message});
        }
    });
});
