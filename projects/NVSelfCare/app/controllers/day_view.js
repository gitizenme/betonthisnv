
var animation = require('alloy/animation');


function updateHintLabel(msg, duration) {
	Ti.API.trace('day_vew.' + arguments.callee.name);
	$.hintLabel.opacity = 0.0;
	animation.fadeIn($.hintLabel, duration);
	$.hintLabel.text = msg;
}


function clickCalendar(e) {
	Ti.API.debug('behavior.' + arguments.callee.name + ': ' + JSON.stringify(e));
	$.day_view.close();
}


var leftNavButton = Alloy.createController('navBarButton').getView();
leftNavButton.title = 'Calendar';
leftNavButton.addEventListener('click', clickCalendar);

// var rightNavButton = Alloy.createController('navBarButton').getView();
// rightNavButton.title = 'Save';
// rightNavButton.addEventListener('click', clickSave);


function openWindow (args) {
	Ti.API.trace('day_view.' + arguments.callee.name);

	$.navGroupWin.leftNavButton = leftNavButton;
	// $.navGroupWin.rightNavButton = rightNavButton;

	updateHintLabel('Day View', 750);

}