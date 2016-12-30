# Modal


## Description ##
This plugin utilizes the [bootstrap modal](http://getbootstrap.com/javascript/#modals) for displaying modals.


## Configuration Options ##

- `title` - The title of the modal. Text only.
- `content` - The content for the modal. Text or HTML.
- `actionButtonText` - The text to display for the action button.
- `cancelButtonText` -  The text to display for the cancel button.


## Example ##

```
var modal = new Modal({
    title: 'Title',
    content: '<div>This is an HTML message</div>',
    actionButtonText: 'Ok',
    cancelButtonText: 'Cancel'
});

modal.show();

modal.on('cancel-clicked', function(e) {
	// Do something here.
    modal.destroy();
});

modal.on('action-clicked', function(e) {
    // Do something here.
    modal.destroy();
});
```


## Contributing ##

If you'd like to contribute plugins, please read the [contributing doc](https://github.com/UnitiApp/uniti-plugins/blob/master/CONTRIBUTE.md).
