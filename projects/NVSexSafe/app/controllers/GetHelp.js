

var args = {
	title: "Get Help"
};
$.getHelp.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.getHelp.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.getHelp.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();


function getHelpClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var args = {
	};


	var contactController = Alloy.createController('contact', args);

	if(OS_IOS) {
		contactController.getView().open();
	}
}
