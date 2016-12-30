define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Plugin = require('../plugin'),
        moment = require('moment'),
        CSS = require('css!./seasonal-background-image.css');

        // How often to check for the date so we can determine the season.
        // Set for every day.
    var DAY_UPDATE_INTERVAL = 86400000,
        // Spring
        SEASON_SPRING = 'spring',
        // Summer
        SEASON_SUMMER = 'summer',
        // Autumn
        SEASON_AUTUMN = 'autumn',
        // Winter
        SEASON_WINTER = 'winter',
        // Day of year spring starts.
        SPRING_START = 80,
        // Day of year summer starts.
        SUMMER_START = 172,
        // Day of year autumn starts.
        AUTUMN_START = 266,
        // Day of year winter starts.
        WINTER_START = 356;

    return Plugin.extend({
        __NAME: 'seasonal-background-image',

        /**
         * This method gets called when the plugin is instantiated.
         *
         * Initialize private variables here.
         *
         * @param {object} options - options for this plugin
         * @returns {void}
         */
        initialize: function(options) {
            Plugin.prototype.initialize.apply(this, [options]);
            this.season = null;
            this.useCustomImages = false;
        },

        /**
         * This method will be called after your method is instantiated.
         * Use this method to confirm the options you need for your plugin
         * to operate are properly set.
         *
         * Verify if custom images are used.
         *
         * @returns {void}
         */
        ensureOptions: function() {
            // If the values were provided for the seasons as options use them.
            if (_(this.options).has(SEASON_SPRING) &&
                !_(this.options[SEASON_SPRING]).isEmpty() &&
                _(this.options).has(SEASON_SUMMER) &&
                !_(this.options[SEASON_SUMMER]).isEmpty() &&
                _(this.options).has(SEASON_AUTUMN) &&
                !_(this.options[SEASON_AUTUMN]).isEmpty() &&
                _(this.options).has(SEASON_WINTER) &&
                !_(this.options[SEASON_WINTER]).isEmpty()) {
                this.useCustomImages = true;
            }
        },

        /**
         * This method will be called after your plugin is instantiated.
         * This is a good area to do any setup for your plugin.
         *
         * Retrieves the current season based on the day of the year.
         * Also sets up an interval to check the current season.
         *
         * @returns {void}
         */
        create: function() {
            this.season = this.getCurrentSeason(moment().dayOfYear());
            this.setupInterval();
        },

        /**
         * This method will be called when your plugin will be destoryed.
         * This is a good area to do any cleaning up for your plugin.
         *
         * Clean up variables and clear out the interval.
         *
         * @returns {void}
         */
        destroy: function() {
            clearInterval(this.interval);
            this.interval = null;
            this.season = null;
            this.useCustomImages = false;
        },

        /**
         * Sets up the interval and when it's triggered,
         * initiate a re-render of the plugin.
         *
         * Initiates the interval to get the current season.
         * It re-renders the background when the season has changed.
         *
         * @returns {void}
         */
        setupInterval: function() {
            var that = this;

            this.interval = setInterval(function() {
                that.season = that.getCurrentSeason(moment().dayOfYear());
                that.trigger('re-render', that);
            }, DAY_UPDATE_INTERVAL);
        },

        /**
         * Retrieves the current season by determining the day of the year.
         *
         * @param {integer} dayOfYear - the current day of the year.
         * @returns {string} the current season.
         */
        getCurrentSeason: function(dayOfYear) {
            var season = null;

            if (dayOfYear < SPRING_START) {
                season = SEASON_WINTER;
            } else if (dayOfYear < SUMMER_START) {
                season = SEASON_SPRING;
            } else if (dayOfYear < AUTUMN_START) {
                season = SEASON_SUMMER;
            } else if (dayOfYear < WINTER_START) {
                season = SEASON_AUTUMN;
            } else {
                season = SEASON_WINTER;
            }

            return season;
        },

        /**
         * This method sets the body with the background image.
         *
         * @returns {void}
         */
        render: function() {
            if (this.useCustomImages === true) {
                this.season = this.options[this.season];
                $('body').css('background-image', 'url(' + this.season + ')');
            } else {
                $('body').addClass(this.season);
            }
        }
    });
});
