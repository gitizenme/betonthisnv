

var args = {
	title: "GET HELP"
};
$.getHelp.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.getHelp.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.getHelp.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();

function clickSend(e) {
	Ti.API.trace('GetHelp.' + arguments.callee.name + ": " + JSON.stringify(e));

    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = "[BetOnThisNV - NV SexSafe] Get Help";
    emailDialog.toRecipients = ['bdhansen@health.nv.gov']; // TODO change this
    emailDialog.html = true;
    emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;
    emailDialog.open();
}


function getHelpClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var args = {
	};


	var contactController = Alloy.createController('contact', args);

	if(OS_IOS) {
		contactController.getView().open();
	}
}
