var dialogs = require('alloy/dialogs');
var animation = require('alloy/animation');

var args = arguments[0] || {};

var userExists = args.userExists || false;

function configureUI() {
	Ti.API.debug('login.' + arguments.callee.name);

	Ti.API.debug('userExists = ' + userExists);

	clearHintLabel();
	updateButtonState("#fff");
	if (userExists) {
		updateHintLabel('Enter your user name and password to login', 750);
		$.loginButtonLabel.visible = true;
		$.loginButtonView.visible = true;
		$.createButtonLabel.visible = false;
		$.createButtonView.visible = false;
		$.resetButton.visible = true;
		$.rightTitle.text = "ACCOUNT\nLOGIN";
	} else {
		alert('FOR YOUR SECURITY, PASSWORDS CANNOT BE RETRIEVED AND INFORMATION IS ONLY STORED ON YOUR PHONE. Please choose a password that is easy to remember. If you need to reset your account, please delete it and start over.', 750);
		updateHintLabel('Create a user name', 750);
		$.createButtonLabel.visible = true;
		$.createButtonView.visible = true;
		$.loginButtonLabel.visible = false;
		$.loginButtonView.visible = false;
		$.resetButton.visible = false;
		$.rightTitle.text = "CREATE\nACCOUNT";
	}
}

// configureUI();

/*
 Ti.App.addEventListener('resumed', function(e) {
 Ti.API.info("resumed");
 configureUI();
 });
 */

function hideKeyboard() {
	Ti.API.debug('login.' + arguments.callee.name);
	$.username.blur();
	$.password.blur();
}

function updateButtonState(color) {
	Ti.API.debug('login.' + arguments.callee.name);
	if (userExists) {
		$.loginButtonView.borderColor = color;
		$.loginButtonLabel.color = color;
	} else {
		$.createButtonView.borderColor = color;
		$.createButtonLabel.color = color;
	}
}

function onFocus(e) {
	Ti.API.debug('login.' + arguments.callee.name + ': ' + JSON.stringify(e));
}

function updateHintLabel(msg, duration) {
	Ti.API.debug('login.' + arguments.callee.name);
	$.hintLabel.opacity = 0.0;
	$.hintLabel.text = msg;
	animation.fadeIn($.hintLabel, duration);
}

function open() {
	Ti.API.debug('login.' + arguments.callee.name);
	configureUI();
}

function focusUsername() {
	Ti.API.debug('login.' + arguments.callee.name);
	if (!userExists) {
		updateHintLabel('Create a user name', 750);
	} else {
		updateHintLabel('Enter your user name', 750);
	}
	updateButtonState("#fff");
}

var passwordValid = false;
var pwdRE = new RegExp("^(?=.*[A-Z])(?=.*[\\W])(?=.*[a-z]).{8,16}$");

function checkPassword() {
	Ti.API.debug('login.' + arguments.callee.name);
	if (pwdRE.test($.password.value)) {
		updateHintLabel('Touch Create to continue...', 750);
		updateButtonState("#D7DF23");
		passwordValid = true;
	} else {
		alert('Password does not meet the minimum requirements');
		updateButtonState("#fff");
		$.password.focus();
		passwordValid = false;
	}
}

function focusPassword() {
	Ti.API.debug('login.' + arguments.callee.name);
	$.password.focus();
	if (!userExists) {
		updateHintLabel('Choose a password of 8 to 16 characters with at least one capital letter, number and special character', 750);
	} else {
		updateHintLabel('Enter your password', 750);
	}
	updateButtonState("#fff");
	passwordValid = false;
}

function focusButton() {
	Ti.API.debug('login.' + arguments.callee.name);
	if ($.password.length == 0) {
		updateHintLabel('Enter a password to login', 750);
	} else {
		if (!userExists) {
			checkPassword();
		} else {
			updateHintLabel('Touch Login to continue...', 750);
			updateButtonState("#D7DF23");
		}
	}
}

function clearHintLabel() {
	Ti.API.debug('login.' + arguments.callee.name);
	$.hintLabel.text = '';
}

function login(e) {
	Ti.API.debug('login.' + arguments.callee.name + ': ' + JSON.stringify(e));
	hideKeyboard();

	var errorMsg = "A valid user name and password is required to login.";

	if ($.username.value.length == 0 || $.username.value == '' || $.password.value.length == 0 || $.password.value == '') {
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

	var users = Alloy.Collections.instance('user');
	var user = users.where({
		username : $.username.value
	});
	if (user.length == 1) {
		var userPassword = Ti.Utils.sha256($.password.value);
		if (userPassword == user[0].attributes.password) {
			Alloy.Globals.AuthenticateOnResume = false;
			Alloy.Globals.UserAuthenticating = false;
			$.login.close();
			Alloy.createController('home', args).getView().open();
		} else {
			alert(errorMsg);
			updateHintLabel(errorMsg, 750);
			$.username.focus();
		}
	} else {
		alert(errorMsg);
		updateHintLabel(errorMsg, 750);
		$.username.focus();
	}

}

function createNewAccount(e) {
	Ti.API.trace('login.' + arguments.callee.name + ': ' + JSON.stringify(e));

	if ($.username.value.length == 0 || $.username.value == '' || $.password.value.length == 0 || $.password.value == '') {
		var errorMsg = "A valid user name and password is required to create an account.";
		alert(errorMsg);
		updateHintLabel(errorMsg, 750);
		$.username.focus();
		return;
	}
	checkPassword();
	if (passwordValid) {
		clearHintLabel();

		var users = Alloy.Collections.instance('user');

		var user = Alloy.createModel('user', {
			username : $.username.value,
			password : Ti.Utils.sha256($.password.value)
		});
		users.add(user);
		user.save();
		Alloy.Globals.AuthenticateOnResume = false;
		Alloy.Globals.UserAuthenticating = false;
		$.login.close();
		Alloy.createController('home', args).getView().open();
	}

}

function onAndroidBack() {
	Ti.API.debug('login.' + arguments.callee.name);
	// do nothing
}

function resetModels() {
	Ti.API.debug('index.' + arguments.callee.name);
	var users = Alloy.Collections.instance('user');

	var model;
	while ( model = users.pop()) {
		model.destroy();
	}
	users.reset();
	Ti.API.debug('users.length = ' + users.length);

	var journal = Alloy.Collections.instance("journal");
	while ( model = journal.pop()) {
		model.destroy();
	}
	journal.reset();
	Ti.API.debug('journal.length = ' + journal.length);

	var documents = Alloy.Collections.instance("documents");
	while ( model = documents.pop()) {
		model.destroy();
	}
	documents.reset();
	Ti.API.debug('documents.length = ' + documents.length);

}

function resetAppData() {
	Ti.API.debug('login.' + arguments.callee.name);

	Ti.App.Properties.setBool('FirstTimeUse', true);
	Ti.App.Properties.setString('version_preference', '');
	Ti.App.Properties.setString('reset_preference', 'NO');
	resetModels();

	userExists = false;
	configureUI();
	$.username.focus();

}

function deleteAccount() {
	Ti.API.debug('login.' + arguments.callee.name);
	dialogs.confirm({
		title : 'Delete Account?',
		message : "By selecting 'Yes' below your NV SelfCare Account will be deleted from this device.\nThis action is not reversible.\nAre you sure?",
		callback : resetAppData
	});

}

