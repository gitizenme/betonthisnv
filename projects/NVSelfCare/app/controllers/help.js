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

var Compression = require('me.izen.compression');
var outputDirectory = Ti.Filesystem.applicationDataDirectory + '/';
var tempDirectory = Ti.Filesystem.tempDirectory + '/';
var zipRootDir = 'package';
var password = 'YourPassword';

function createArchive(writeToZip) {
	Ti.API.trace('GetHelp.' + arguments.callee.name);

	var zipOkay = false;
	Ti.API.info("Output to ZIP file: " + writeToZip);

	var packageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, zipRootDir);
	if (! packageDir.exists()) {
		packageDir.createDirectory();
	}

	var a_txt = Ti.Filesystem.getFile(packageDir.resolve(), 'a.txt');
	Ti.API.debug("a_txt path = " + a_txt.resolve());
	a_txt.write("This is the a.txt file....", false);

	var b_txt = Ti.Filesystem.getFile(packageDir.resolve(), 'b.txt');
	Ti.API.debug("b_txt path = " + b_txt.resolve());
	b_txt.write("This is the b.txt file....", false);

	var result = '';

	if(OS_IOS) {
		result = Compression.zip(writeToZip, zipRootDir, password, [a_txt.resolve(), b_txt.resolve()]);
	}
	if(OS_ANDROID) {
		result = Compression.zip(writeToZip, zipRootDir, password, [a_txt.name, b_txt.name]);
	}

	if (result == 'success') {
		if (!Ti.Filesystem.getFile(writeToZip).exists()) {
			Ti.API.error('FAIL: The target zip does not exist!');
		} else {
			Ti.API.info('Zip Files: ' + result + ', to: ' + writeToZip);
		}
		zipOkay = true;
	} else {
		Ti.API.error("Error creating archive: " + result);
	}

	packageDir = null;
	a_txt = null;
	b_txt = null;

	return zipOkay;
}

function clickSend(e) {
	Ti.API.trace('GetHelp.' + arguments.callee.name + ": " + JSON.stringify(e));

	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "[BetOnThisNV - NV SelfCare] Get Help";
	// TODO change this
	emailDialog.toRecipients = ['joe@izen.me'];
	emailDialog.html = true;
	emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;

	var writeToZip = outputDirectory + '/nvsexsafe_package.zip';

	if (createArchive(writeToZip)) {
		if (OS_ANDROID) {
			var f = Ti.Filesystem.getFile(writeToZip);
			var copyFileName = Ti.Filesystem.tempDirectory + '/nvsexsafe_package.zip';
			if (f.copy(copyFileName)) {
				var fCopy = Ti.Filesystem.getFile(writeToZip);
				emailDialog.addAttachment(fCopy);
				emailDialog.open();
			} else {
				alert("Unable create data archive for SelfCare. Unable to send message.");
				Ti.API.error("Copy of attachment file failed: " + copyFileName);
			}

		} else if (OS_IOS) {
			emailDialog.addAttachment(Ti.Filesystem.getFile(writeToZip));
			emailDialog.open();
		}
	}
	else {
		alert("Unable create data archive for SelfCare. Unable to send message.");
	}
}

