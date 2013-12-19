// Colors
// Black: #0A0A0A
// Yellow/Green: #D7DF23
// Cyan: #2399A3
// Red: #E81C24


// Tab Bar Dim Icons: 130,130,130
// Tab Bar Active Icons: 8,176,194
// Locked Reel Labels: 255,255,255
// Unlocked Reel Labels: 0,0,0
// Red: 232,28,36
// Blue: 8,176,194
// Yellow/Green: 215,223,35

Titanium.UI.setBackgroundColor('#000');

var prodVersion = Ti.App.Properties.getString('version_preference', '0.0.0-DEV');

function checkForAppReset() {
	Ti.API.trace('index.' + arguments.callee.name);
	var appSettingsReset = Ti.App.Properties.getString('reset_preference', 'NO');
	Titanium.API.debug('reset_preference:' + appSettingsReset);
	if (appSettingsReset === 'YES') {
		Ti.App.Properties.setString('version_preference', '');
		Ti.App.Properties.setString('reset_preference', 'NO');
	}
}

// Function to test if device is iOS 7 or later
function isIOS7Plus() {
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

function init() {
	Ti.API.trace('index.' + arguments.callee.name);
	checkForAppReset();
	if (Ti.App.Properties.getString('version_preference', '') == '') {
		if (ENV_PRODUCTION) {
			prodVersion = Ti.App.version + '-GA';
		} else {
			prodVersion = Ti.App.version + '-DEV';
		}
	}

	var newVersion = Ti.App.version.split(".");
	var currentVersion = prodVersion.split(".");
	
	var majorNew = parseInt(newVersion[0], 10);
	var majorCurrent = parseInt(currentVersion[0], 10);

	var minorNew = parseInt(newVersion[1], 10);
	var minorCurrent = parseInt(currentVersion[1], 10);

	var revNew = parseInt(newVersion[2].split("-")[0], 10);
	var revCurrent = parseInt(currentVersion[2].split("-")[0], 10);

	if(majorNew != majorCurrent || minorNew != minorCurrent || revNew != revCurrent) {
		Ti.API.info("Updating version number stored in app settings");
		Ti.App.Properties.setString('version_preference', prodVersion);
	}
	
	Ti.API.debug('prodVersion = ' + prodVersion);
	Alloy.Globals.version = prodVersion;
}

function openWebView() {
	var args = {
	};

	var controller = Alloy.createController('BetOnThisNVWebView', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

function open(e) {
	Ti.API.trace('index.' + arguments.callee.name);
	init();
}

Ti.API.info("Ti.Platform.displayCaps.platformWidth = " + Ti.Platform.displayCaps.platformWidth);
Ti.API.info("Ti.Platform.displayCaps.platformHeight = " + Ti.Platform.displayCaps.platformHeight);

var iOS7 = isIOS7Plus();
$.index.top = iOS7 ? 20 : 0;

$.index.open();

