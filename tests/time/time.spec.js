define(function(require) {
    'use strict';

    var $ = require('jquery'),
        moment = require('moment'),
        Time = require('time/time');

    describe('time/time.js', function() {
        var view;

        afterEach(function() {
            if (view) {
                view.remove();
            }
        });

        function createPlugin(options) {
            view = new Time(options);
        }

        describe('ensureOptions method', function() {
            it('should have name set', function() {
                createPlugin();
                expect(view.__NAME).toEqual('time');
            });

            it('should set default date format option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.date).toEqual('MMMM, Do YYYY');
            });

            it('should set default time format option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.time).toEqual('h:mm');
            });

            it('should set default meridiem format option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.meridiem).toEqual('A');
            });

            it('should set date format option when passed in', function() {
                createPlugin({
                    date: 'MMMM'
                });

                view.ensureOptions();
                expect(view.options.date).toEqual('MMMM');
            });

            it('should set time format option when passed in', function() {
                createPlugin({
                    time: 'h'
                });

                view.ensureOptions();
                expect(view.options.time).toEqual('h');
            });

            it('should set meridiem format option when passed in', function() {
                createPlugin({
                    meridiem: 'a'
                });

                view.ensureOptions();
                expect(view.options.meridiem).toEqual('a');
            });
        });

        describe('create method', function() {
            var setupIntervalSpy;

            afterEach(function() {
                setupIntervalSpy = null;
            });

            it('should call create and setupInterval to be called', function() {
                createPlugin({
                    date: 'MMM, D YYYY',
                    time: 'H:m',
                    meridiem: 'a'
                });

                setupIntervalSpy = spyOn(view, 'setupInterval');

                view.create();
                expect(setupIntervalSpy).toHaveBeenCalled();
            });
        });

        describe('destroy method', function() {
            it('should call destroy and cleaInterval', function() {
                createPlugin({
                    date: 'MMM, D YYYY',
                    time: 'H:m',
                    meridiem: 'a'
                });
                
                view.destroy();
                expect(view.interval).toBeNull();
            });
        });

        describe('setupInterval method', function() {
            beforeEach(function() {
                createPlugin({
                    date: 'MMM, D YYYY',
                    time: 'H:m',
                    meridiem: 'a'
                });

                spyOn(view, 'trigger');
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('should call setupInterval and trigger re-render', function() {
                view.setupInterval();

                setInterval(function() {
                    view.trigger('re-render', view);
                }, 50);

                expect(view.trigger).not.toHaveBeenCalled();

                jasmine.clock().tick(51);
                expect(view.trigger).toHaveBeenCalledWith('re-render', view);
                expect(view.interval).not.toBeNull();
            });
        });

        describe('render method', function() {
            it('should render date and time with format options passed in', function() {
                createPlugin({
                    date: 'MMM, D YYYY',
                    time: 'H:m',
                    meridiem: 'a'
                });

                view.ensureOptions();
                var renderedTemplate = view.render();
                expect($.trim($(renderedTemplate).find('.plugin--time-time').text())).toEqual(moment().format('H:m a'));
                expect($.trim($(renderedTemplate).find('.plugin--time-date').text())).toEqual(moment().format('MMM, D YYYY'));
            });

            it('should render date and time with default options', function() {
                createPlugin();

                view.ensureOptions();
                var renderedTemplate = view.render();
                expect($.trim($(renderedTemplate).find('.plugin--time-time').text())).toEqual(moment().format('h:mm A'));
                expect($.trim($(renderedTemplate).find('.plugin--time-date').text())).toEqual(moment().format('MMMM, Do YYYY'));
            });
        });
    });
});
