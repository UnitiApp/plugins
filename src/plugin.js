define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone');

    return Backbone.View.extend({

        /**
         * This method gets called when a plugin is instantiated.
         *
         * @param {object} options - options for this plugin
         * @return {void}
         */
        initialize: function(options) {
            _.bindAll(this, 'destroyPlugin');
            this.options = _({}).extend(options);
        },

        /**
         * Helper method to destroy a plugin.
         *
         * @return {void}
         */
        destroyPlugin: function() {
            this.trigger('destroy-plugin', this);
            this.off();
        }
    });
});
