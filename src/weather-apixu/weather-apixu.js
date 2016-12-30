define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Plugin = require('../plugin'),
        Model = require('./model'),
        CSS = require('css!./weather-apixu.css'),
        Template = require('text!./weather-apixu.html');

        // Every hour
    var WEATHER_UPDATE_INTERVAL = 3600000,
        // API key
        DEFAULT_WEATHER_KEY = 'cacdf29dc2be47d484a105606152306',
        // Search query
        DEFAULT_WEATHER_SEARCH = 'auto:ip',
        // Days of weather
        DEFAULT_WEATHER_DAYS = 8;

    return Plugin.extend({
        __NAME: 'weather-apixu',

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
         * Sets default options in the event they are not provided.
         *
         * @returns {void}
         */
        ensureOptions: function() {
            if (!_(this.options).has('key')) {
                this.options.key = DEFAULT_WEATHER_KEY;
            }

            if (!_(this.options).has('search')) {
                this.options.search = DEFAULT_WEATHER_SEARCH;
            }

            if (!_(this.options).has('days')) {
                this.options.days = DEFAULT_WEATHER_DAYS;
            }
        },

        /**
         * Sets up an interval to update the weather.
         *
         * @returns {void}
         */
        create: function() {
            this.model = new Model();
            this.fetchWeather();
            this.setupInterval();
        },

        /**
         * Clears the interval and clean up.
         *
         * @returns {void}
         */
        destroy: function() {
            clearInterval(this.interval);
            this.model = null;
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
                that.fetchWeather();
            }, WEATHER_UPDATE_INTERVAL);
        },

        /**
         * Fetches the weather and initiates a re-render of the plugin.
         * We also cache the resources data so no repeated calls are made.
         *
         * @returns {void}
         */
        fetchWeather: function() {
            var that = this,
                url = 'http://api.apixu.com/v1/forecast.json?' +
                    'key=' + this.options.key +
                    '&q=' + this.options.search +
                    '&days=' + this.options.days;

            this.model.fetch({
                data: {
                    url: url,
                    cache: {
                        name: this.__NAME,
                        ttl: WEATHER_UPDATE_INTERVAL
                    }
                },
                success: function() {
                    that.trigger('re-render', that);
                },
                error: function() {
                    that.trigger('re-render', that);
                }
            });
        },

        /**
         * Renders the plugin.
         *
         * @returns {string} the html markup.
         */
        render: function() {
            return this.template({weather: this.model.toJSON()});
        }
    });
});
