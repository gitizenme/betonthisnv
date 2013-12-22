
var animation = require('alloy/animation');


function updateHintLabel(msg, duration) {
	Ti.API.trace('day_vew.' + arguments.callee.name);
	$.hintLabel.opacity = 0.0;
	animation.fadeIn($.hintLabel, duration);
	$.hintLabel.text = msg;
}

function clickBack(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
	$.navGroup.close();
    $.day_view.close();
}

function clickBackAndroid(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
    $.navGroupWidget.close();
}


var leftNavButton = Alloy.createController('navBarButton').getView();
leftNavButton.title = 'Back';
leftNavButton.addEventListener('click', clickBack);

// var rightNavButton = Alloy.createController('navBarButton').getView();
// rightNavButton.title = 'Save';
// rightNavButton.addEventListener('click', clickSave);


function open (args) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(args));

	updateHintLabel('Day View', 750);
}


if (OS_ANDROID) {
    $.navGroupWidget.open($.navGroupWin, {});
}

if (OS_IOS) {
    $.navGroupWin.leftNavButton = leftNavButton;
    $.navGroupWidget.init($.navGroup, {});
    $.navGroupWidget.open($.navGroupWin, {});
}
