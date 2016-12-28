var tests = Object.keys(window.__karma__.files).filter(function(file) {
  return (/\.spec\.js$/.test(file));
});

require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'sinon': {
            exports: 'sinon'
        }
    },
    baseUrl: '/base/src',
    paths: {
        'sinon': '../node_modules/sinon/pkg/sinon-1.17.6',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'domReady': '../bower_components/requirejs-domready/domReady',
        'requirejs-text': '../bower_components/requirejs-text/text',
        'text': '../bower_components/requirejs-text/text',
        'css': '../bower_components/require-css/css',
        'moment': '../bower_components/moment/moment'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    callback: window.__karma__.start
});
