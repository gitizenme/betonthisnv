
var androidBackButtonClicked = false;

function clickBack(e) {
	Ti.API.debug('BetOnThisNVWebView.' + arguments.callee.name);
	$.navGroup.close();
    $.BetOnThisNVWebView.close();
	androidBackButtonClicked = true;
}


function onAndroidBack() {
	Ti.API.debug('BetOnThisNVWebView.' + arguments.callee.name);
	androidBackButtonClicked = true;
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

function open() {
    Ti.API.trace('BetOnThisNVWebView.' + arguments.callee.name);
	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

if (OS_ANDROID) {

	function stopActivityAndroid(e) {
		Ti.API.trace('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	    $.navWin.close();
	    if(!androidBackButtonClicked) {
			Alloy.Globals.AuthenticateOnResume = true;
	    }
	}

}

if (OS_ANDROID) {
    $.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
    $.navWin.leftNavButton = leftNavButton;
    // $.contactWin.rightNavButton = rightNavButton;
    $.navGroupWidget.init($.navGroup, {});
    $.navGroupWidget.open($.navWin, {});
}
