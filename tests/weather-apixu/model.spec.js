define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        sinon = require('sinon'),
        Model = require('weather-apixu/model');

    describe('weather-apixu/model.js', function() {
        var model,
            server;

        beforeEach(function() {
            server = sinon.fakeServer.create();
            model = new Model();
        });

        afterEach(function() {
            model = null;
            server.restore();
        });

        describe('url method', function() {
            it('should construct the url properly', function() {
                expect(model.url()).toEqual('/http');
            });
        });

        describe('parse method', function() {
            var serverResponse = readJSON('tests/mocks/weather-apixu-json-response.json');

            it('should parse the model with a successful response', function() {
                server.respondWith([
                    200,
                    {'Content-Type': 'application/json'},
                    JSON.stringify(serverResponse)
                ]);

                model.fetch();
                server.respond();

                expect(model.get('today').day).toEqual('Today');
            });

            it('should fail parsing the model and return null', function() {
                server.respondWith([
                    200,
                    {'Content-Type': 'application/json'},
                    JSON.stringify('{"error":{"code":1005,"message":"API URL is invalid."}}')
                ]);

                model.fetch();
                server.respond();

                expect(model.get('today')).toBeUndefined();
            });
        });
    });
});
