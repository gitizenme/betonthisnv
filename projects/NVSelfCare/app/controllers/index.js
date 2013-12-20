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

function open() {
	Ti.API.trace('index.' + arguments.callee.name);
	init();
}

Ti.API.info("Ti.Platform.displayCaps.platformWidth = " + Ti.Platform.displayCaps.platformWidth);
Ti.API.info("Ti.Platform.displayCaps.platformHeight = " + Ti.Platform.displayCaps.platformHeight);

var iOS7 = isIOS7Plus();
$.index.top = iOS7 ? 20 : 0;

$.index.open(); 