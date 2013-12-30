// Colors
// Black: #0A0A0A
// Yellow/Green: #D7DF23
// Cyan: #2399A3
// Red: #E81C24

// Dimensions (1X/2X):
// Date Square- 42x45px/84x90px
// Date Square Spacing- 3px/6px each side, 4px/8px from the screen edge
// Month Bar- 26px/52px high
// Day of the Week Bar- 16px/32px high
//
// Colors (RGB):
// Background- 8,176,194
// Month Bar- 255,255,255
// Day of the Week Bar- 9,124,136
// Date/Month- 0,0,0
// Date Square- 255,255,255
// Date Square Dim- 134,216,225
// Date Icons- 9,124,136
// Date Icons Important (Alarm and Dr. Appointment)- 237,28,36
// Day of the Week Text- 255,255,255
// Tab Bar Icons Dim- 130,130,130
// Tab Bar Icons Lit- 8,176,194
// Nav Bar Icons- 255,255,255

Titanium.UI.setBackgroundColor('#000');

var Compression = require('me.izen.compression');
var outputDirectory = Ti.Filesystem.applicationDataDirectory;
var inputDirectory = Ti.Filesystem.resourcesDirectory + 'data/';

var prodVersion = Ti.App.Properties.getString('version_preference', '0.0.0-DEV');

function resetModels() {
	Ti.API.debug('index.' + arguments.callee.name);
	var users = Alloy.Collections.instance('user');

	var model;
	while (model = users.pop()) {
		model.destroy();
	}
	users.reset();
	Ti.API.debug('users.length = ' + users.length);

	var journal = Alloy.Collections.instance("journal"); 
	while (model = journal.pop()) {
		model.destroy();
	}
	journal.reset();
	Ti.API.debug('journal.length = ' + journal.length);

}

function checkForAppReset() {
	Ti.API.debug('index.' + arguments.callee.name);

	var appSettingsReset = Ti.App.Properties.getString('reset_preference', 'NO');
	Titanium.API.debug('reset_preference:' + appSettingsReset);
	if (appSettingsReset === 'YES') {
		Ti.App.Properties.setBool('FirstTimeUse', true);
		Ti.App.Properties.setString('version_preference', '');
		Ti.App.Properties.setString('reset_preference', 'NO');
		resetModels();
	}
}

// Function to test if device is iOS 7 or later
function isIOS7Plus() {
	Ti.API.debug('index.' + arguments.callee.name);
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);

		// Can only test this support on a 3.2+ device
		if (major >= 7) {
			return true;
		}
	}
	return false;
}

function initFirstTimeUse() {
	Ti.API.debug('index.' + arguments.callee.name);
	Alloy.Globals.FirstTimeUse = Ti.App.Properties.getBool('FirstTimeUse', true);
	Titanium.API.debug('Alloy.Globals.FirstTimeUse:' + Alloy.Globals.FirstTimeUse);
}

function nextController() {
	Ti.API.debug('index.' + arguments.callee.name);
	/*
	 if (Alloy.Globals.FirstTimeUse) {
	 Alloy.createController('home').getView().open();
	 } else {
	 Alloy.createController('login').getView().open();
	 }
	 */

	var users = Alloy.Collections.instance('user');

	var args = {
		userExists : users.length
	};

	Alloy.createController('login', args).getView().open();
}

function setAppVersion() {
	if (Ti.App.Properties.getString('version_preference', '') == '') {
		if (ENV_PRODUCTION) {
			prodVersion = Ti.App.version + '-GA';
		} else {
			prodVersion = Ti.App.version + '-DEV';
		}
		Ti.App.Properties.setString('version_preference', prodVersion);
	}

	var newVersion = Ti.App.version.split(".");
	var currentVersion = prodVersion.split(".");

	var majorNew = parseInt(newVersion[0], 10);
	var majorCurrent = parseInt(currentVersion[0], 10);

	var minorNew = parseInt(newVersion[1], 10);
	var minorCurrent = parseInt(currentVersion[1], 10);

	var revNew = parseInt(newVersion[2].split("-")[0], 10);
	var revCurrent = parseInt(currentVersion[2].split("-")[0], 10);

	if (majorNew != majorCurrent || minorNew != minorCurrent || revNew != revCurrent) {
		Ti.API.info("Updating version number stored in app settings");
		Ti.App.Properties.setString('version_preference', prodVersion);
	}

	Ti.API.debug('prodVersion = ' + prodVersion);
	Alloy.Globals.version = prodVersion;
}

function testCompression() {
	var writeToZip = outputDirectory + '/zipFiles.zip';
	Ti.API.info("Output to ZIP file: " + writeToZip);

	var result = Compression.zip(writeToZip, 'YourPassword', [inputDirectory + 'a.txt', inputDirectory + 'b.txt']);

	if (result == 'success') {
		if (!Ti.Filesystem.getFile(writeToZip).exists()) {
			Ti.API.error('FAIL: The target zip does not exist!');
		} else {
			Ti.API.info('Zip Files: ' + result + ', to: ' + writeToZip);
		}
	}
}

function init() {
	Ti.API.debug('index.' + arguments.callee.name);

	// testCompression();
	checkForAppReset();
	setAppVersion();
	initFirstTimeUse();

	nextController();

}

function openWebView() {
	Ti.API.debug('index.' + arguments.callee.name);
	var args = {
	};

	var controller = Alloy.createController('BetOnThisNVWebView', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

var resumeFirstTime = true;
function open() {
	Ti.API.trace('index.' + arguments.callee.name);
	init();

	if (OS_ANDROID) {
		$.index.activity.addEventListener('restart', restartAppAndroid);
	}

}

Ti.API.info("Ti.Platform.displayCaps.platformWidth = " + Ti.Platform.displayCaps.platformWidth);
Ti.API.info("Ti.Platform.displayCaps.platformHeight = " + Ti.Platform.displayCaps.platformHeight);

var iOS7 = isIOS7Plus();
$.index.top = iOS7 ? 20 : 0;

if (OS_ANDROID) {

	function restartAppAndroid() {
		Ti.API.trace('index.' + arguments.callee.name);
		if (Alloy.Globals.AuthenticateOnResume) {
			resumeApp();
		} else {
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}

}

function resumeApp() {
	Ti.API.trace('index.' + arguments.callee.name);
	checkForAppReset();
	setAppVersion();
	nextController();
}

if (OS_IOS) {
	Ti.App.addEventListener('resumed', resumeApp);
}

$.index.open();
