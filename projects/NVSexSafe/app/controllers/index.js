
// Colors
// Black: #0A0A0A
// Green: #C8D624
// Cyan: #2399A3
// Red: #CC0920


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
	Ti.API.debug('prodVersion = ' + prodVersion);
}

function open() {
	Ti.API.trace('index.' + arguments.callee.name);
	init();
}

Ti.API.info("Ti.Platform.displayCaps.platformWidth = " + Ti.Platform.displayCaps.platformWidth);
Ti.API.info("Ti.Platform.displayCaps.platformHeight = " + Ti.Platform.displayCaps.platformHeight);

$.index.open();

