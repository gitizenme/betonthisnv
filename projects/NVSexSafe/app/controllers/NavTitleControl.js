

var args = arguments[0] || {};

$.title.text = args.title || 'NO TITLE!!!!';


function betOnThisClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var args = {
	};


	var contactController = Alloy.createController('contact', args);

	if(OS_IOS) {
		contactController.getView().open();
	}
	
}
