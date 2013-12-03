


var args = {
	title: "Find Condoms"
};
$.findCondoms.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.findCondoms.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.findCondoms.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
