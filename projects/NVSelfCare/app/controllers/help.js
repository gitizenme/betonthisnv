var dialogs = require('alloy/dialogs');
var animation = require('alloy/animation');

var args = {
	title : "GET HELP"
};
$.getHelp.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.getHelp.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.getHelp.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();

function hideKeyboard() {
	$.name.blur();
	$.phone.blur();
	$.message.blur();
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

if (OS_IOS) {
	function AddKeyboardToolbar(TheEdit) {
		// Add a toolbar on top of the keyboard that includes a Done
		//   button to blur focus (uses iOS buttons)
		var flexSpace = Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
			right : 0
		});
		var doneButton = Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.DONE,
			right : 0
		});

		TheEdit.keyboardToolbar = [flexSpace, doneButton];
		TheEdit.addEventListener('focus', function(e) {
			TheEdit.keyboardToolbar = [flexSpace, doneButton];
			doneButton.activeFld = TheEdit;
		});
		doneButton.addEventListener('click', function(e) {
			e.source.activeFld.blur();
			focusMessage();
		});
	};

	AddKeyboardToolbar($.phone);
}

function clickSend(e) {
	Ti.API.trace('GetHelp.' + arguments.callee.name + ": " + JSON.stringify(e));

	if($.message.value === null || $.message.value == '') {
		alert("Please enter a message, this information is required.");
		return;
	}

	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "[BetOnThisNV - NV SelfCare] Get Help";
	// TODO change this
	emailDialog.html = true;
	emailDialog.toRecipients = ['bdhansen@health.nv.gov'];
	emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;
	emailDialog.addEventListener("complete", function() {
		alert("Thank you for contacting us. You will receive a response in 72 hours, often less.");
	});
	emailDialog.open();

}

