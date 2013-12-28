/**
 * @author Joe Chavez
 */

var args = arguments[0] || {};

var navGroup = args.navGroup || null;
var winTitle = args.title || null;

var openAndroidView = false;

$.navGroup = navGroup;

function open() {
	Ti.API.debug('TCell.' + arguments.callee.name);

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('TCell.' + arguments.callee.name);

}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('TCell.' + arguments.callee.name);
		openAndroidView = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('TCell.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		if (!openAndroidView) {
			Alloy.Globals.AuthenticateOnResume = true;
			$.navWin.close();
		} else {
			$.navWin.close();
		}
	}

	$.navWin.title =  winTitle || $.navWin.title;

	$.navGroup.open($.navWin, {});
}

if (OS_IOS) {
	var titleArgs = {
		title : winTitle || "TCell"
	};

	function clickSave(e) {
		Ti.API.debug('TCell.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		$.TCell.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.TCell.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.TCell.rightNavButton = rightNavButton;
}
