define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Plugin = require('../plugin'),
        Bootstrap = require('bootstrap'),
        CSS = require('css!./modal.css'),
        Template = require('text!./modal.html');

    var DEFAULT_MODAL_TITLE = '',
        DEFAULT_MODAL_CONTENT = '',
        DEFAULT_MODAL_ACTION_BUTTON_TEXT = 'Ok',
        DEFAULT_MODAL_CANCEL_BUTTON_TEXT = 'Cancel',
        MODAL_ACTION_BUTTON_SELECTOR = '.plugin--modal-action',
        MODAL_CANCEL_BUTTON_SELECTOR = '.plugin--modal-cancel';

    return Plugin.extend({

        __NAME: 'modal',

        template: _.template(Template),

        /**
         * This method gets called when the plugin is instantiated.
         *
         * @param {object} options - options for this plugin
         * @returns {void}
         */
        initialize: function(options) {
            Plugin.prototype.initialize.apply(this, [options]);
            this.ensureOptions();
            this.create();
        },

        /**
         * This method will be called after your method is instantiated.
         * Use this method to confirm the options you need for your plugin
         * to operate are properly set.
         *
         * Verify the options needed are passed in.
         *
         * @returns {void}
         */
        ensureOptions: function() {
            if (!_(this.options).has('title')) {
                this.options.title = DEFAULT_MODAL_TITLE;
            }

            if (!_(this.options).has('content')) {
                this.options.content = DEFAULT_MODAL_CONTENT;
            }

            if (!_(this.options).has('actionButtonText')) {
                this.options.actionButtonText =
                    DEFAULT_MODAL_ACTION_BUTTON_TEXT;
            }

            if (!_(this.options).has('cancelButtonText')) {
                this.options.cancelButtonText =
                    DEFAULT_MODAL_CANCEL_BUTTON_TEXT;
            }
        },

        /**
         * This method will be called after your plugin is instantiated.
         * This is a good area to do any setup for your plugin.
         *
         * Render the bootstrap modal dom elements.
         *
         * @returns {void}
         */
        create: function() {
            this.render();
        },

        /**
         * This method will be called when your plugin will be destoryed.
         * This is a good area to do any cleaning up for your plugin.
         *
         * Destory the bootstrap modal dom elements and events.
         *
         * @returns {void}
         */
        destroy: function() {
            var modalSelector = this.getModalSelector(),
                modalBackdropSelector = this.getModalBackdropSelector();

            $('body')
                .find(modalSelector)
                .off()
                .remove();

            $('body')
                .find(modalBackdropSelector)
                .remove();

            $(modalSelector)
                .find(MODAL_CANCEL_BUTTON_SELECTOR)
                .off();

            $(modalSelector)
                .find(MODAL_ACTION_BUTTON_SELECTOR)
                .off();
        },

        /**
         * Returns the modal selector.
         *
         * @returns {string} the modal selector.
         */
        getModalSelector: function() {
            return '.plugin--' + this.__NAME;
        },

        /**
         * Returns the modal backdrop selector.
         *
         * @returns {string} the modal backdrop selector.
         */
        getModalBackdropSelector: function() {
            return '.modal-backdrop';
        },

        /**
         * Displays the modal.
         * Bind events to listen to the button clicks.
         *
         * @returns {void}
         */
        show: function() {
            $(this.getModalSelector()).modal({
                show: true,
                backdrop: 'static'
            });

            this.listenToButtonClicks();
        },

        /**
         * Listens to the action and cancel button click events.
         * Triggers events to the consumer and passing the event object.
         *
         * @returns {void}
         */
        listenToButtonClicks: function() {
            var that = this;

            $(this.getModalSelector())
                .find(MODAL_CANCEL_BUTTON_SELECTOR).
                on('click', function(e) {
                    that.trigger('cancel-clicked', e);
                });

            $(this.getModalSelector())
                .find(MODAL_ACTION_BUTTON_SELECTOR)
                .on('click', function(e) {
                    that.trigger('action-clicked', e);
                });
        },

        /**
         * This method renders the template.
         *
         * @returns {void}
         */
        render: function() {
            $('body').append(this.template({
                title: this.options.title,
                content: this.options.content,
                actionButtonText: this.options.actionButtonText,
                cancelButtonText: this.options.cancelButtonText
            }));
        }
    });
});
