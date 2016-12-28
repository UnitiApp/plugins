define(function(require) {
    'use strict';

    var _ = require('underscore'),
        moment = require('moment'),
        Backbone = require('backbone');

    return Backbone.Model.extend({

        /**
         * This method gets called when the model is going to fetch a resource.
         *
         * @param {object} options - options for this model
         * @returns {string} the url to fetch the resource
         */
        url: function() {
            return '/http';
        },

        /**
         * This method gets called after the fetching is done. It translates
         *  what we need from the resources response.
         *
         * @param {object} response - the response from the resource.
         * @returns {mixed} the resource or null.
         */
        parse: function(response) {
            var today = null,
                forecasts = null,
                parsedReponse = null;

            if (response && _(response).has('forecast')) {
                today = _(response.forecast.forecastday).first();
                forecasts = _.without(
                    response.forecast.forecastday,
                    _.first(response.forecast.forecastday)
                );

                parsedReponse = {
                    today: {
                        day: 'Today',
                        icon: today.day.condition.icon,
                        low: Math.round(today.day.maxtemp_f),
                        high: Math.round(today.day.mintemp_f)
                    },
                    forecast: []
                };

                _(forecasts).each(function(forecast) {
                    parsedReponse.forecast.push({
                        day: moment(forecast.date).format('ddd'),
                        high: Math.round(forecast.day.maxtemp_f),
                        low: Math.round(forecast.day.mintemp_f),
                        icon: forecast.day.condition.icon
                    });
                });

                return parsedReponse;
            }

            return null;
        }
    });
});
