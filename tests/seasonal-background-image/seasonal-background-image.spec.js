define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        moment = require('moment'),
        sinon = require('sinon'),
        SeasonalBackgroundImage = require('seasonal-background-image/seasonal-background-image');

    describe('seasonal-background-image/seasonal-background-image.js', function() {
        var view;

        afterEach(function() {
            if (view) {
                view.remove();
            }
        });

        function createPlugin(options) {
            view = new SeasonalBackgroundImage(options);
        }

        describe('ensureOptions method', function() {
            it('should have name set', function() {
                createPlugin();
                expect(view.__NAME).toEqual('seasonal-background-image');
            });

            it('should have useCustomImages set to false', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.useCustomImages).toBeFalsy();
            });

            it('should set background image options and set useCustomImages to true', function() {
                createPlugin({
                    spring: 'http://www.google.com/spring.png',
                    summer: 'http://www.google.com/summer.png',
                    autumn: 'http://www.google.com/autumn.png',
                    winter: 'http://www.google.com/winter.png'
                });

                view.ensureOptions();
                expect(view.options.spring).toEqual('http://www.google.com/spring.png');
                expect(view.options.summer).toEqual('http://www.google.com/summer.png');
                expect(view.options.autumn).toEqual('http://www.google.com/autumn.png');
                expect(view.options.winter).toEqual('http://www.google.com/winter.png');
                expect(view.useCustomImages).toBeTruthy();
            });

            it('should set useCustomImages to false if one background image option not set', function() {
                createPlugin({
                    spring: '',
                    summer: 'http://www.google.com/summer.png',
                    autumn: 'http://www.google.com/autumn.png',
                    winter: 'http://www.google.com/winter.png'
                });

                view.ensureOptions();
                expect(view.useCustomImages).toBeFalsy();
            });
        });

        describe('create method', function() {
            var getCurrentSeasonSpy,
                setupIntervalSpy;

            afterEach(function() {
                getCurrentSeasonSpy = null;
                setupIntervalSpy = null;
            });

            it('should call create and instantiate a call getCurrentSeason', function() {
                createPlugin();

                getCurrentSeasonSpy = spyOn(view, 'getCurrentSeason');
                setupIntervalSpy = spyOn(view, 'setupInterval');

                view.ensureOptions();
                view.create();
                expect(getCurrentSeasonSpy).toHaveBeenCalledWith(moment().dayOfYear());
                expect(setupIntervalSpy).toHaveBeenCalled();
            });
        });

        describe('destroy method', function() {
            it('should call destroy and cleaInterval', function() {
                createPlugin();
                
                view.ensureOptions();
                view.destroy();
                expect(view.interval).toBeNull();
                expect(view.season).toBeNull();
                expect(view.useCustomImages).toBeFalsy();
            });
        });

        describe('setupInterval method', function() {
            var getCurrentSeasonSpy;

            beforeEach(function() {
                createPlugin();

                getCurrentSeasonSpy = spyOn(view, 'getCurrentSeason');
                jasmine.clock().install();
            });

            afterEach(function() {
                jasmine.clock().uninstall();
            });

            it('should call setupInterval and call getCurrentSeason and trigger re-render', function() {
                spyOn(view, 'trigger');

                view.setupInterval();

                setInterval(function() {
                    getCurrentSeasonSpy(moment().dayOfYear());
                    view.trigger('re-render', view);
                }, 50);

                expect(getCurrentSeasonSpy).not.toHaveBeenCalled();

                jasmine.clock().tick(51);
                expect(getCurrentSeasonSpy.calls.count()).toEqual(1);
                expect(getCurrentSeasonSpy).toHaveBeenCalledWith(moment().dayOfYear());
                expect(view.trigger).toHaveBeenCalledWith('re-render', view);
                expect(view.interval).not.toBeNull();
            });
        });

        describe('getCurrentSeason method', function() {
            var season = null;

            beforeEach(function() {
                createPlugin();
            });

            it('should call getCurrentSeason and return the correct season', function() {
                season = view.getCurrentSeason(moment('2016-01-03').dayOfYear());
                expect(season).toEqual('winter');

                season = view.getCurrentSeason(moment('2016-03-19').dayOfYear());
                expect(season).toEqual('winter');

                season = view.getCurrentSeason(moment('2016-03-20').dayOfYear());
                expect(season).toEqual('spring');

                season = view.getCurrentSeason(moment('2016-06-19').dayOfYear());
                expect(season).toEqual('spring');

                season = view.getCurrentSeason(moment('2016-06-20').dayOfYear());
                expect(season).toEqual('summer');

                season = view.getCurrentSeason(moment('2016-06-21').dayOfYear());
                expect(season).toEqual('summer');

                season = view.getCurrentSeason(moment('2016-12-20').dayOfYear());
                expect(season).toEqual('autumn');

                season = view.getCurrentSeason(moment('2016-09-21').dayOfYear());
                expect(season).toEqual('summer');

                season = view.getCurrentSeason(moment('2016-09-22').dayOfYear());
                expect(season).toEqual('autumn');

                season = view.getCurrentSeason(moment('2016-12-21').dayOfYear());
                expect(season).toEqual('winter');

                season = view.getCurrentSeason(moment('2016-09-22').dayOfYear());
                expect(season).toEqual('autumn');
            });
        });

        describe('render method', function() {
            it('should render the correct seasonal background', function() {
                createPlugin();

                view.ensureOptions();
                view.season = view.getCurrentSeason(moment('2016-12-21').dayOfYear());
                view.render();

                expect(view.season).toEqual('winter');
                expect($('body').hasClass('winter')).toBeTruthy();
            });

            it('should render custom seasonal background', function() {
                createPlugin({
                    spring: 'http://www.google.com/spring.png',
                    summer: 'http://www.google.com/summer.png',
                    autumn: 'http://www.google.com/autumn.png',
                    winter: 'http://www.google.com/winter.png'
                });

                view.ensureOptions();
                view.season = view.getCurrentSeason(moment('2016-12-21').dayOfYear());
                view.render();

                expect(view.season).toEqual('http://www.google.com/winter.png');
                expect($('body').css('background-image')).toEqual('url(http://www.google.com/winter.png)');
            });
        });
    });
});
