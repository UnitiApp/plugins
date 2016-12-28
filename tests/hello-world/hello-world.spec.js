define(function(require) {
    'use strict';

    var $ = require('jquery'),
        HelloWorld = require('hello-world/hello-world');

    describe('hello-world/hello-world.js', function() {
        var view;

        afterEach(function() {
            if (view) {
                view.remove();
            }
        });

        function createPlugin(options) {
            view = new HelloWorld(options);
        }

        describe('ensureOptions method', function() {
            it('should have name set', function() {
                createPlugin();
                expect(view.__NAME).toEqual('hello-world');
            });
            
            it('should set default message option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.message).toEqual('Hello World!');
            });

            it('should set message option when passed in', function() {
                createPlugin({
                    message: 'Testing from jasmine'
                });

                view.ensureOptions();
                expect(view.options.message).toEqual('Testing from jasmine');
            });
        });

        describe('render method', function() {
            it('should render message when set', function() {
                createPlugin({
                    message: 'This is fun'
                });

                view.ensureOptions();
                var renderedTemplate = view.render();
                expect($(renderedTemplate).text()).toEqual('This is fun');
            });

            it('should render default message when message not set', function() {
                createPlugin();

                view.ensureOptions();
                var renderedTemplate = view.render();
                expect($(renderedTemplate).text()).toEqual('Hello World!');
            });
        });
    });
});
