

// Function to test if device is iOS 7 or later
if (OS_IOS) {
	function isIOS7Plus() {
		Ti.API.debug('home.' + arguments.callee.name);
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

}


function init() {
	Ti.API.debug('home.' + arguments.callee.name);

}


function open() {
	Ti.API.trace('home.' + arguments.callee.name);

	init();

}


if (OS_IOS) {
	var iOS7 = isIOS7Plus();
	$.home.top = iOS7 ? 20 : 0;
}

