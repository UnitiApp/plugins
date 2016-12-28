// Karma configuration
module.exports = function(config) {
    'use strict';

    config.set({
        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // Available frameworks to use https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],

        // List of files/patterns to load in the browser
        files: [
            'tests/test-main.js',
            'node_modules/karma-read-json/karma-read-json.js', // Provide the ability to load json fixtures.
            'node_modules/sinon/pkg/sinon-1.17.6.js', // Add sinon.
            {pattern: 'src/**/*.*', included: false},
            {pattern: 'tests/**/*.js', included: false},
            {pattern: 'bower_components/**/*.js', included: false},
            {pattern: 'bower_components/**/*.json', included: false},
            {pattern: 'bower_components/**/*.css', included: false},

            // Fixtures
            {pattern: 'tests/mocks/*.json', included: false}
        ],

        // List of files to exclude
        exclude: [],

        preprocessors: {
            'src/**/*.js': 'coverage'
        },

        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },

        // Test results reporter to use possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'coverage'],

        // Web server port
        port: 9876,

        // Enable/disable colors in the output (reporters and logs)
        colors: true,
        
        // Level of logging - possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,
        
        // Enable/disable watching file and executing tests whenever any file changes
        autoWatch: false,
        
        // Start these browsers. Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        singleRun: true,
        captureTimeout: 60000,
        reportSlowerThan: 100,
        browserDisconnectTimeout: 60000,
        browserDisconnectTolerance: 3
    });
};
