

function showLeavingAppAlert(targetUrl) {
	if (OS_ANDROID) {
		var msg = "You are now leaving the SexSafe app and visiting " + targetUrl + ". To return to the app, press the back button on your phone.";
	}
	if (OS_IOS) {
		var msg = "You are now leaving the SexSafe app and visiting " + targetUrl + ". To return to the app, double tap the home button on your phone.";
	}

	var dialog = Ti.UI.createAlertDialog({
    	cancel: 1,
    	buttonNames : ['Continue', 'Cancel'],
		message : msg,
		title : Ti.App.name
	});
	dialog.addEventListener('click', function(e) {
		if (e.index !== e.source.cancel){
			Ti.Platform.openURL(targetUrl);
		}
	});
	dialog.show();

}

function onTheWebClick(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	showLeavingAppAlert(Ti.App.url);
}

function onTheWebIzenMeClick(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	showLeavingAppAlert("http://www.izen.me");
}

var androidBackButtonClicked = false;

function open() {
	Ti.API.trace('About.' + arguments.callee.name);

	$.versionLabel.text += Alloy.Globals.version;
	$.descriptionLabel.text += Ti.App.description;
	$.copyrightLabel.text += Ti.App.copyright;
	$.publisherLabel.text += Ti.App.publisher;
	$.urlLabel.text += Ti.App.url;

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('About.' + arguments.callee.name);
		androidBackButtonClicked = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.trace('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroupWidget.close();
		if (!androidBackButtonClicked) {
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}


	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
	function clickBack(e) {
		Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
	}

	var leftNavButton = Ti.UI.createButton({
		title : 'Back'
	});
	leftNavButton.addEventListener('click', clickBack);

	var args = {
		title : "ABOUT"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});
}

