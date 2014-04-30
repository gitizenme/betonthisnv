var androidBackButtonClicked = false;



function open() {
	Ti.API.trace('BetOnThisNVWebView.' + arguments.callee.name);

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}


if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('BetOnThisNVWebView.' + arguments.callee.name);
		androidBackButtonClicked = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.trace('BetOnThisNVWebView.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroupWidget.close();
		if (!androidBackButtonClicked) {
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}


	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
	function clickBack(e) {
		Ti.API.debug('BetOnThisNVWebView.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
	}

	var leftNavButton = Ti.UI.createButton({
		title : 'Back'
	});
	leftNavButton.addEventListener('click', clickBack);

	var args = {
		title : "BetOnThisNV.org"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});
}


