var args = arguments[0] || {};

var win = args.win || null;

function clickBack(e) {
	$.navGroup.close();
}

function clickBackAndroid(e) {
	$.navGroupWidget.close();
}

var leftNavButton = Ti.UI.createButton({
	title : 'Back'
});
leftNavButton.addEventListener('click', clickBack);

/*
 var rightNavButton = Ti.UI.createButton({
 title : 'Send'
 });
 rightNavButton.addEventListener('click', clickSend);
 */

/*
 var win = {
 risk : "",
 safety : "",
 orientation : "",
 activity : "",
 protection : ""
 };

 */

function open() {
	Ti.API.trace('DisplayWin.' + arguments.callee.name);
	if (win === null) {
		if (OS_ANDROID) {
			$.navGroupWidget.close();
		} else {
			$.navGroup.close();
		}
		alert("Unable to display win!");
	} else {
		$.orientationBody.text = win.orientation;
		$.activityBody.text = win.activity;
		$.protectionBody.text = win.protection;
		$.riskBody.text = win.risk;

		if (win.safety != "") {
			$.safetyBody.text = win.safety;
		} else {
			var text = "There is not safety information for this SexSafe activity. Checkout ☞ http://www.betonthisnv.org for more information.";
			$.safetyBody.text = text;
		}
	}
}

function showLeavingAppAlert(targetUrl) {
	if (OS_ANDROID) {
		var msg = "You are now leaving the SexSafe app and visiting " + targetUrl + ". To return to the app, press the back button on your phone.";
	}
	if (OS_IOS) {
		var msg = "You are now leaving the SexSafe app and visiting " + targetUrl + ". To return to the app, double tap the home button on your phone.";
	}

	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Continue', 'Cancel'],
		message : msg,
		title : Ti.App.name
	});
	dialog.addEventListener('click', function(e) {
		if (e.index !== e.source.cancel) {
			Ti.Platform.openURL(targetUrl);
		}
	});
	dialog.show();

}

if (OS_ANDROID) {
	$.safetyBody.addEventListener('click', function() {
		showLeavingAppAlert("http://betonthisnv.org/Protect/How_to_Use_a_Condom/");
	});
	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {

	function openUrl(e) {
		if ($.safetyBody.text.indexOf("http://") != -1) {
			Ti.API.debug('DisplayWin.' + arguments.callee.name + ': ' + JSON.stringify(e));
			showLeavingAppAlert("http://betonthisnv.org/Protect/How_to_Use_a_Condom/");
		}
	}

	var args = {
		title : "RISK FACTOR"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});

	$.safetyBody.addEventListener('click', openUrl);
}
