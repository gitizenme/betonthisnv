

var args = {
	title: "GET HELP"
};
$.getHelp.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.getHelp.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.getHelp.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();

function clickSend(e) {
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = "[BetOnThisNV - NVSexSafe] Get Help";
    emailDialog.toRecipients = ['info@izen.me']; // TODO change this
    // emailDialog.bccRecipients = ['info@izen.me']; // TODO change this
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
