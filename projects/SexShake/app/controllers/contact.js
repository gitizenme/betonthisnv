

var animation = require('alloy/animation');

function updateHintLabel(msg, duration) {
	Ti.API.trace('contact.' + arguments.callee.name);
	$.hintLabel.opacity = 0.0;
	animation.fadeIn($.hintLabel, duration);
	$.hintLabel.text = msg;
}

function clickBack(e) {
	$.contact.close();
}

var leftNavButton = Ti.UI.createButton({
	title: 'Back'
});
leftNavButton.title = 'Back';
leftNavButton.addEventListener('click', clickBack);


function open() {
	Ti.API.trace('contact.' + arguments.callee.name);

	// $.navGroupWin.tabBarHidden = false;
	if(OS_IOS) {
		$.navGroupWin.leftNavButton = leftNavButton;
	}
		
	
	// $.navGroupWin.rightNavButton = rightNavButton;

	// var scrollView = Ti.UI.createScrollView( {
		// layout: 'vertical'
	// });
	// var scrollLabel = Ti.UI.createLabel( {
		// text : 'test'
	// });
	// $.navGroupWin.add(scrollView);
	// $.navGroupWin.open();
	
	$.contactNavGroup.init($.navGroup);

	updateHintLabel('Contact View', 750);
}

if(OS_ANDROID) {
	$.contactNavGroup.init($.navGroup);
	updateHintLabel('Contact View', 750);
}

