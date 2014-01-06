var dialogs = require('alloy/dialogs');
var animation = require('alloy/animation');


var args = {
	title: "GET HELP"
};
$.getHelp.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.getHelp.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.getHelp.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();

function hideKeyboard() {
	$.name.blur();
	$.phone.blur();
	$.message.blur();
	updateHintLabel('', 0);
}

function updateHintLabel(msg, duration) {
	$.hintLabel.opacity = 0.0;
	animation.fadeIn($.hintLabel, duration);
	$.hintLabel.text = msg;
}

function focusName() {
	updateHintLabel('Enter your name', 750);
}

function focusPhoneNumber() {
	$.phone.focus();
	updateHintLabel('Enter your phone number', 750);
}

function focusMessage() {
	$.message.focus();	
	updateHintLabel('Enter a brief message', 750);
}

function focusSendButton() {
	hideKeyboard();
	updateHintLabel('Touch Send to get help', 750);
}

function onTouchStart() {
	hideKeyboard();
}

function clickSend(e) {
	Ti.API.trace('GetHelp.' + arguments.callee.name + ": " + JSON.stringify(e));

    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = "[BetOnThisNV - NV SexSafe] Get Help";
    emailDialog.toRecipients = ['bdhansen@health.nv.gov']; // TODO change this
    emailDialog.html = true;
    emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;
    emailDialog.open();
}
