

if (OS_IOS) {
	var args = {
		title : "ELIGIBILITY"
	};
	$.tabWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.tabWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
	$.tabWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
}

function init() {
	Ti.API.debug('eligibility.' + arguments.callee.name);

}

function open() {
	Ti.API.debug('eligibility.' + arguments.callee.name);

	init();

}

