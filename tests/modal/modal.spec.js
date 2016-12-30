define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Modal = require('modal/modal');

    describe('modal/modal.js', function() {
        var view;

        afterEach(function() {
            if (view) {
                view.destroy();
            }
        });

        function createPlugin(options) {
            view = new Modal(options);
        }

        describe('ensureOptions method', function() {
            it('should have name set', function() {
                createPlugin();
                expect(view.__NAME).toEqual('modal');
            });
            
            it('should set default message option', function() {
                createPlugin();

                view.ensureOptions();
                expect(view.options.title).toEqual('');
                expect(view.options.content).toEqual('');
                expect(view.options.actionButtonText).toEqual('Ok');
                expect(view.options.cancelButtonText).toEqual('Cancel');
            });

            it('should set message option when passed in', function() {
                createPlugin({
                    title: 'Title',
                    content: 'Content',
                    actionButtonText: 'Agree',
                    cancelButtonText: 'Disagree'
                });

                view.ensureOptions();
                expect(view.options.title).toEqual('Title');
                expect(view.options.content).toEqual('Content');
                expect(view.options.actionButtonText).toEqual('Agree');
                expect(view.options.cancelButtonText).toEqual('Disagree');
            });
        });

        describe('create method', function() {
            var renderSpy;

            afterEach(function() {
                renderSpy = null;
            });

            it('should call create and render', function() {
                createPlugin();

                renderSpy = spyOn(view, 'render');

                view.create();
                expect(renderSpy).toHaveBeenCalled();
                expect($(view.getModalSelector()).length).toEqual(1);
            });
        });

        describe('destroy method', function() {
            it('should call destroy and remove elements created for the modal', function() {
                createPlugin();
                
                view.destroy();
                expect($(view.getModalSelector()).length).toEqual(0);
            });
        });

        describe('getModalSelector method', function() {
            var selector;

            it('should call getModalSelector and return the modal selector', function() {
                createPlugin();
                
                selector = view.getModalSelector();
                expect(selector).toEqual('.plugin--' + view.__NAME);
            });
        });

        describe('getModalBackdropSelector method', function() {
            var selector;

            it('should call getModalBackdropSelector and return the modal backdrop selector', function() {
                createPlugin();
                
                selector = view.getModalBackdropSelector();
                expect(selector).toEqual('.modal-backdrop');
            });
        });

        describe('show method', function() {
            var listenToButtonClicksSpy;

            afterEach(function() {
                listenToButtonClicksSpy = null;
            });

            it('should call show and display modal', function() {
                createPlugin();
                
                listenToButtonClicksSpy = spyOn(view, 'listenToButtonClicks');

                view.show();
                expect($('body').hasClass('modal-open')).toBeTruthy();
                expect(listenToButtonClicksSpy).toHaveBeenCalled();
            });
        });

        describe('listenToButtonClicks method', function() {
            var viewTriggerCancelClickedSpy,
                viewTriggerActionClickedSpy,
                e = $.Event('click');

            afterEach(function() {
                viewTriggerCancelClickedSpy = null;
                viewTriggerActionClickedSpy = null;
            });

            it('should trigger cancel-clicked event', function() {
                createPlugin();
                
                viewTriggerCancelClickedSpy = spyOn(view, 'trigger');

                view.show();
                $(view.getModalSelector).find('.plugin--modal-cancel').trigger(e);
                expect(viewTriggerCancelClickedSpy).toHaveBeenCalledWith('cancel-clicked', e);
            });

            it('should trigger action-clicked event', function() {
                createPlugin();
                
                viewTriggerActionClickedSpy = spyOn(view, 'trigger');

                view.show();
                $(view.getModalSelector).find('.plugin--modal-action').trigger(e);
                expect(viewTriggerActionClickedSpy).toHaveBeenCalledWith('action-clicked', e);
            });
        });

        describe('render method', function() {
            var modal;

            afterEach(function() {
                modal = null;
            });

            it('should render modal dom elements', function() {
                createPlugin({
                    title: 'Title',
                    content: '<div>Content</div>',
                    actionButtonText: 'Agree',
                    cancelButtonText: 'Disagree'
                });

                modal = $(view.getModalSelector());

                expect(modal.length).toEqual(1);
                expect(modal.find('.modal-title').text()).toEqual('Title');
                expect(modal.find('.modal-body').html()).toEqual('<div>Content</div>');
                expect(modal.find('.plugin--modal-cancel').text()).toEqual('Disagree');
                expect(modal.find('.plugin--modal-action').text()).toEqual('Agree');
            });
        });
    });
});
