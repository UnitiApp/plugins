define(function(require) {
    'use strict';

    var Plugin = require('plugin');

    describe('plugin.js', function() {
        var view;

        afterEach(function() {
            if (view) {
                view.remove();
            }
        });

        function createPlugin(options) {
            view = new Plugin(options);
        }

        describe('destroyPlugin method', function() {
            var triggerSpy,
                offSpy;
                
            it('should trigger an event and off', function() {
                createPlugin();

                triggerSpy = spyOn(view, 'trigger');
                offSpy = spyOn(view, 'off');

                view.destroyPlugin();

                expect(triggerSpy).toHaveBeenCalledWith('destroy-plugin', view);
                expect(offSpy).toHaveBeenCalled();
            });
        });
    });
});
