

var args = {
	title: "Get Tested"
};
$.getTested.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.getTested.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.getTested.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
