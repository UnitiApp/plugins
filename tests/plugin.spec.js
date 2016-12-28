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
                unbindSpy;
                
            it('should trigger an event and unbind', function() {
                createPlugin();

                triggerSpy = spyOn(view, 'trigger');
                unbindSpy = spyOn(view, 'unbind');

                view.destroyPlugin();

                expect(triggerSpy).toHaveBeenCalledWith('destroy-plugin', view);
                expect(unbindSpy).toHaveBeenCalled();
            });
        });
    });
});
