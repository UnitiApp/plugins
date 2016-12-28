define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Plugin = require('../plugin'),
        moment = require('moment'),
        CSS = require('css!./time.css'),
        Template = require('text!./time.html');

        // Every minute
    var TIME_UPDATE_INTERVAL = 60000,
        // December, 15th 2016
        DEFAULT_DATE_FORMAT = 'MMMM, Do YYYY',
        // 11:52
        DEFAULT_TIME_FORMAT = 'h:mm',
        // AM/PM
        DEFAULT_MERIDIEM_FORMAT = 'A';

    return Plugin.extend({
        __NAME: 'time',
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
         * Ensures the options initialized with in the constructor
         * provide what the plugin needs to operate.
         *
         * @returns {void}
         */
        ensureOptions: function() {
            if (!_(this.options).has('date')) {
                this.options.date = DEFAULT_DATE_FORMAT;
            }

            if (!_(this.options).has('time')) {
                this.options.time = DEFAULT_TIME_FORMAT;
            }

            if (!_(this.options).has('meridiem')) {
                this.options.meridiem = DEFAULT_MERIDIEM_FORMAT;
            }
        },

        /**
         * Sets up an interval to update the time.
         *
         * @returns {void}
         */
        create: function() {
            this.setupInterval();
        },

        /**
         * Clears the interval and clean up.
         *
         * @returns {void}
         */
        destroy: function() {
            clearInterval(this.interval);
            this.interval = null;
        },

        /**
         * Sets up the interval and when it's triggered,
         * initiate a re-render of the plugin.
         *
         * @returns {void}
         */
        setupInterval: function() {
            var that = this;

            this.interval = setInterval(function() {
                that.trigger('re-render', that);
            }, TIME_UPDATE_INTERVAL);
        },

        /**
         * Renders the plugin.
         *
         * @returns {string} the html markup.
         */
        render: function() {
            return this.template({
                date: moment().format(this.options.date),
                time: moment().format(this.options.time),
                meridiem: moment().format(this.options.meridiem)
            });
        }
    });
});
