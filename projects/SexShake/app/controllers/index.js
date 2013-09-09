$.sex_shake_web.init($.sex_shake);
$.sex_shake_web.on('click', function(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 0
    };
    var win1 = Alloy.createController('BetOnThisNVWebView', arg).getView();
});

$.info_web.init($.info);
$.info_web.on('click', function(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 0
    };
    var win2 = Alloy.createController('BetOnThisNVWebView', arg).getView();
});

function getTestedClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 1
    };
    var win3 = Alloy.createController('BetOnThisNVWebView', arg).getView();
}

function findCondomsClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 2
    };
    var win4 = Alloy.createController('BetOnThisNVWebView', arg).getView();
}

function emailSendComplete(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    if (e.success) {
        alert("Message sent!");
    }
    else {
        alert("Unable to send message, please try again later.");
    }
}

function getHelpClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var emailDialog = Ti.UI.createEmailDialog();
    if (emailDialog.isSupported()) {
        emailDialog.subject = "Bet On This NV: Get Help";
        emailDialog.toRecipients = ['info@izen.me'];
        emailDialog.html = true;
        emailDialog.messageBody = "<ul><li>Your Name:</li><li>Phone number:</li><li>Message:</li></ul>";
        emailDialog.addEventListener('comnplete', emailSendComplete);
        emailDialog.open({animated:true});
    }
    else {
        alert("E-mail not available. Please create an e-mail account on your mobile device.");
    }
}

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

$.index.open();

Alloy.Globals.tabGroup = $.index; 