


var args = arguments[0] || {};


function rightNavClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var args = {
	};


	var controller = Alloy.createController('BetOnThisNVWebView', args);

	if(OS_IOS) {
		controller.getView().open();
	}
	
}
