var dialogs = require('alloy/dialogs');
var animation = require('alloy/animation');
var Compression = require('me.izen.compression');

var args = arguments[0] || {};

var outputDirectory = args.outputDirectory || Ti.Filesystem.applicationDataDirectory + '/';
var tempDirectory = args.tempDirectory || Ti.Filesystem.tempDirectory + '/';
var zipRootDir = args.zipRootDir || 'package';
var zipFileName = args.zipFileName || 'NVSelfCareEncryptedArchive.zip';
var title = args.title || 'SEND';
var sendInfo = args.sendInfo || 'Please enter a password to create an encrypted file that contains the information.\nThis file will be encrypted and sent via the e-mail app on your device.\nTIP: A strong 8 to 16 characters with at least one capital letter, number and special character.';
var sendFileList = args.sendFileList || [];

function configureUI() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);

	clearHintLabel();
	$.rightTitle.text = title;
	$.hintLabel.text = sendInfo;
	updateButtonState("#fff");
}

function focusName() {
	if(OS_ANDROID) {
		updateHintLabel(sendInfo + '\nEnter your name', 750);
	}
	if(OS_IOS) {
		updateHintLabel('Enter your name', 750);
	}
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
	// hideKeyboard();
	// $.sendButtonView.focus();
	updateHintLabel('Touch Send to continue or the back button to cancel', 750);
}

function onTouchStart() {
	hideKeyboard();
	updateHintLabel(sendInfo, 750);
}

function hideKeyboard() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);

	$.name.blur();
	$.phone.blur();
	$.message.blur();
	$.password.blur();
}

function updateButtonState(color) {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);

	$.sendButtonView.borderColor = color;
	$.sendButtonLabel.color = color;
}

function updateHintLabel(msg, duration) {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
	$.hintLabel.opacity = 0.0;
	$.hintLabel.text = msg;
	animation.fadeIn($.hintLabel, duration);
}

function open() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
	configureUI();
	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
		$.navWin.activity.addEventListener('restart', restartActivityAndroid);
		$.navWin.activity.addEventListener('pause', pauseActivityAndroid);
		$.navWin.activity.addEventListener('resume', resumeActivityAndroid);

		// Action Bar
		if (Alloy.Globals.Android.Api >= 11 && $.navWin.activity.actionBar != null) {
			$.navWin.activity.actionBar.title = 'SEND JOURNAL';
		} else {
			$.navWin.title = 'SEND JOURNAL';
		}
	}
}

var passwordValid = false;
var pwdRE = new RegExp("^(?=.*[A-Z])(?=.*[\\W])(?=.*[a-z]).{8,16}$");

function checkPassword() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
	if (pwdRE.test($.password.value)) {
		updateHintLabel('Touch SEND to continue...', 750);
		updateButtonState("#D7DF23");
		passwordValid = true;
		focusSendButton();
	} else {
		alert('Password does not meet the minimum requirements');
		updateButtonState("#fff");
		$.password.focus();
		passwordValid = false;
	}
}

function focusPassword() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
	$.password.focus();
	updateHintLabel('8 to 16 characters with at least one capital letter, number and special character.', 750);
	updateButtonState("#fff");
	passwordValid = false;
}

function focusButton() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
	if ($.password.length == 0) {
		updateHintLabel('Enter a password to send your information via e-mail.', 750);
	} else {
		checkPassword();
	}
}

function clearHintLabel() {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
	$.hintLabel.text = '';
}

function createArchive(writeToZip, password) {
	Ti.API.trace('journal.' + arguments.callee.name);

	var zipOkay = false;
	Ti.API.info("Output to ZIP file: " + writeToZip);

	var result = '';

	result = Compression.zip(writeToZip, zipRootDir, password, sendFileList);

	if (result == 'success') {
		if (!Ti.Filesystem.getFile(writeToZip).exists()) {
			Ti.API.error('FAIL: The target zip does not exist!');
		} else {
			Ti.API.info('Zip Files: ' + result + ', to: ' + writeToZip);
			zipOkay = true;
		}
	} else {
		Ti.API.error("Error creating archive: " + result);
	}

	for (var i = sendFileList.length - 1; i >= 0; i--) {
		sendFileList[i] = null;
	};

	return zipOkay;
}

function sendMessage(password) {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "[BetOnThisNV - NV SelfCare] Get Help";
	emailDialog.toRecipients = ['bdhansen@health.nv.gov'];
	emailDialog.html = true;
	emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;

	var writeToZip = outputDirectory + '/' + zipFileName;

	if (createArchive(writeToZip, password)) {
		if (OS_ANDROID) {
			var f = Ti.Filesystem.getFile(writeToZip);
			var copyFileName = Ti.Filesystem.tempDirectory + '/' + zipFileName;
			if (f.copy(copyFileName)) {
				var fCopy = Ti.Filesystem.getFile(writeToZip);
				emailDialog.addAttachment(fCopy);
				emailDialog.open();
			} else {
				alert("Unable create data archive for SelfCare. Unable to send message.");
				Ti.API.error("Copy of attachment file failed: " + copyFileName);
				return false;
			}

		} else if (OS_IOS) {
			emailDialog.addAttachment(Ti.Filesystem.getFile(writeToZip));
			emailDialog.open();
		}
		return true;
	} else {
		alert("Unable create data archive for SelfCare. Unable to send message.");
	}
	return false;

}

function sendEncryptedMessage(e) {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name + ': ' + JSON.stringify(e));
	hideKeyboard();

	var errorMsg = "A valid password is required to send information via e-mail.";

	if ($.password.value.length == 0 || $.password.value == '') {
		alert(errorMsg);
		updateHintLabel(errorMsg, 750);
		updateButtonState("#fff");
		return;
	} else {
		clearHintLabel();
	}

	if (e && e.source && _.isFunction(e.source.blur)) {
		e.source.blur();
	}

	if (sendMessage($.password.value)) {
		if (OS_IOS) {
			$.navGroup.close();
		}
		if (OS_ANDROID) {
			onAndroidBack();
		}
	} else {
		Ti.API.warn('Unable to create and send encrypted file.');
	}
}

function focus(e) {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
}

function blur(e) {
	Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
}

if (OS_ANDROID) {
	$.navGroupWidget.open($.navWin, {});
	function onAndroidBack() {
		Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name);
		$.openAndroidView = true;
		Alloy.Globals.AuthenticateOnResume = false;
		$.navWin.close();
	}

	function resumeActivityAndroid(e) {
		Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function pauseActivityAndroid(e) {
		Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function restartActivityAndroid(e) {
		Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (Alloy.Globals.AuthenticateOnResume) {
			$.navWin.close();
		}
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (!$.openAndroidView) {
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}

}

if (OS_IOS) {

	function clickBack(e) {
		Ti.API.debug('SendEncryptedMessage.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
	}

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

	var leftNavButton = Alloy.createController('navBarButton').getView();
	leftNavButton.title = 'Back';
	leftNavButton.addEventListener('click', clickBack);

	// var rightNavButton = Alloy.createController('navBarButton').getView();
	// rightNavButton.title = 'Save';
	// rightNavButton.addEventListener('click', clickSave);

	var args = {
		title : "SEND JOURNAL"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.navWin.leftNavButton = leftNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});
}

