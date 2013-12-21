var args = arguments[0] || {};

var user = args.user || null;

$.home.addEventListener('focus', onFocus);

function onFocus(e) {
	Ti.API.debug('home.' + arguments.callee.name + ': ' + JSON.stringify(e));
	if(user != null) {
		Ti.API.info('user.username: ' + user.attributes.username);
	}

	if(Alloy.Globals.FirstTimeUse) {
		Alloy.Globals.FirstTimeUse = false;
		Ti.App.Properties.setBool('FirstTimeUse', false);
	}	
}

function open() {
	Ti.API.debug('home.' + arguments.callee.name);
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

var iOS7 = isIOS7Plus();
$.home.top = iOS7 ? 20 : 0;