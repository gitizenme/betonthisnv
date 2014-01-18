var args = arguments[0] || {};

var navGroup = args.navGroup || null;

$.openAndroidView = false;

function onAndroidBack() {
	Ti.API.debug('navWindowTemplate.' + arguments.callee.name);
	Alloy.Globals.AuthenticateOnResume = false;
	$.openAndroidView = true;
}

function open() {
	Ti.API.debug('navWindowTemplate.' + arguments.callee.name);

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

if (OS_ANDROID) {

	function stopActivityAndroid(e) {
		Ti.API.debug('navWindowTemplate.' + arguments.callee.name + ': ' + JSON.stringify(e));
	    $.navWin.close();
		if (!$.openAndroidView) {
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}

}

if (OS_ANDROID) {
	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
	var titleArgs = {
		title : "COMMENT"
	};

	function clickSave(e) {
		Ti.API.debug('navWindowTemplate.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navWindowTemplate.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton: Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.navWindowTemplate.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.navWindowTemplate.rightNavButton = rightNavButton;
}
