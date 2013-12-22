

if (OS_IOS) {
	var args = {
		title : "JOURNAL"
	};
	$.tabWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.tabWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
	$.tabWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
}

function init() {
	Ti.API.debug('diary.' + arguments.callee.name);

}

function open() {
	Ti.API.debug('diary.' + arguments.callee.name);

	init();

}

