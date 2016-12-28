define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        sinon = require('sinon'),
        Weather = require('weather-apixu/weather-apixu');

    describe('weather-apixu/weather-apixu.js', function() {
        var view;

        afterEach(function() {
            if (view) {
                view.remove();
            }
        });

        function createPlugin(options) {
            view = new Weather(options);
        }

        describe('ensureOptions method', function() {
            it('should have name set', function() {
                createPlugin();
                expect(view.__NAME).toEqual('weather-apixu');
            });

            it('should set default key option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.key).toEqual('cacdf29dc2be47d484a105606152306');
            });

            it('should set key option when passed in', function() {
                createPlugin({
                    key: 'foo'
                });

                view.ensureOptions();
                expect(view.options.key).toEqual('foo');
            });

            it('should set default search option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.search).toEqual('auto:ip');
            });

            it('should set search option when passed in', function() {
                createPlugin({
                    search: '11554'
                });

                view.ensureOptions();
                expect(view.options.search).toEqual('11554');
            });

            it('should set default days option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.days).toEqual(8);
            });

            it('should set days option when passed in', function() {
                createPlugin({
                    days: 10
                });

                view.ensureOptions();
                expect(view.options.days).toEqual(10);
            });
        });

        describe('create method', function() {
            var fetchWeatherSpy,
                setupIntervalSpy;

            afterEach(function() {
                fetchWeatherSpy = null;
                setupIntervalSpy = null;
            });

            it('should call create and instantiate a new Backbone model', function() {
                createPlugin({
                    key: 'foo',
                    search: '11554',
                    days: 8
                });

                fetchWeatherSpy = spyOn(view, 'fetchWeather');
                setupIntervalSpy = spyOn(view, 'setupInterval');

                view.ensureOptions();
                view.create();
                expect(fetchWeatherSpy).toHaveBeenCalled();
                expect(setupIntervalSpy).toHaveBeenCalled();
                expect(view.model instanceof Backbone.Model).toBeTruthy();
            });
        });

        describe('destroy method', function() {
            it('should call destroy and cleaInterval', function() {
                createPlugin({
                    key: 'foo',
                    search: '11554',
                    days: 8
                });
                
                view.destroy();
                expect(view.interval).toBeNull();
                expect(view.model).toBeNull();
            });
        });

        describe('setupInterval method', function() {
            var fetchWeatherSpy;

            beforeEach(function() {
                createPlugin({
                    key: 'foo',
                    search: '11554',
                    days: 8
                });

                fetchWeatherSpy = spyOn(view, 'fetchWeather');
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('should call setupInterval and trigger fetchWeather', function() {
                view.setupInterval();

                setInterval(function() {
                    fetchWeatherSpy();
                }, 50);

                expect(fetchWeatherSpy).not.toHaveBeenCalled();

                jasmine.clock().tick(51);
                expect(fetchWeatherSpy.calls.count()).toEqual(1);
                expect(fetchWeatherSpy).toHaveBeenCalled();
                expect(view.interval).not.toBeNull();
            });
        });

        describe('fetchWeather method', function() {
            var weatherModelFetchStub;

            beforeEach(function() {
                createPlugin({
                    key: 'foo',
                    search: '11554',
                    days: 8
                });
            });

            it('should call fetchWeather with success and trigger re-render', function() {
                view.ensureOptions();
                view.create();

                spyOn(view, 'trigger');

                weatherModelFetchStub = sinon.stub(view.model, 'fetch').yieldsTo('success');
                view.fetchWeather();

                expect(weatherModelFetchStub.called).toBeTruthy();
                expect(view.trigger).toHaveBeenCalledWith('re-render', view);
            });

            it('should call fetchWeather with error and trigger re-render', function() {
                view.ensureOptions();
                view.create();

                spyOn(view, 'trigger');

                weatherModelFetchStub = sinon.stub(view.model, 'fetch').yieldsTo('error');
                view.fetchWeather();

                expect(weatherModelFetchStub.called).toBeTruthy();
                expect(view.trigger).toHaveBeenCalledWith('re-render', view);
            });
        });

        describe('render method', function() {
            var weatherModel;

            it('should render weather template with no weather model', function() {
                createPlugin({
                    key: 'foo',
                    search: '11554',
                    days: 8
                });

                view.ensureOptions();
                view.model = new Backbone.Model();
                var renderedTemplate = view.render();
                expect($.trim($(renderedTemplate).text())).toEqual('');
            });

            it('should render weather template with no weather model', function() {
                weatherModel = new Backbone.Model();
                weatherModel.set({
                    today: {
                        day: 'Today',
                        icon: '//cdn.apixu.com/weather/64x64/night/116.png',
                        low: '36',
                        high: '44'
                    }
                });

                createPlugin({
                    key: 'foo',
                    search: '11554',
                    days: 8
                });

                view.ensureOptions();
                view.model = weatherModel;

                var renderedTemplate = view.render();
                expect(
                    $.trim($(renderedTemplate).find('.plugin--weather-apixu-today-forecast-date').text())
                ).toEqual('Today');
                
                expect(
                    $.trim($(renderedTemplate).find('.plugin--weather-apixu-today-forecast-icon').attr('src'))
                ).toEqual('//cdn.apixu.com/weather/64x64/night/116.png');

                expect(
                    $.trim($(renderedTemplate).find('.plugin--weather-apixu-today-forecast-temperature').text())
                ).toEqual('36°/44°');
            });
        });
    });
});
