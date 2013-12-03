


var args = arguments[0] || {};


function leftNavClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var args = {
	};


	var contactController = Alloy.createController('About', args);

	if(OS_IOS) {
		contactController.getView().open();
	}
}
