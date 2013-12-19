var args = arguments[0] || {};

var win = args.win || null;

function clickBack(e) {
	$.DisplayWin.close();
}

function clickBackAndroid(e) {
	$.navGroupWidget.close();
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

/*
 var win = {
 risk : "",
 safety : "",
 orientation : "",
 activity : "",
 protection : ""
 };

 */

function open() {
	Ti.API.trace('DisplayWin.' + arguments.callee.name);
	if (win === null) {
		if (OS_ANDROID) {
			$.navGroupWidget.close();
		} else {
			$.DisplayWin.close();
		}
		alert("Unable to display win!");
	} else {
		$.orientationBody.text = win.orientation;
		$.activityBody.text = win.activity;
		$.protectionBody.text = win.protection;
		$.riskBody.text = win.risk;

		if (win.safety != "") {
			$.safetyBody.text = win.safety;
		} else {
			$.safetyBody.text = "N/A";
		}
	}
}

if (OS_ANDROID) {
	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
	var args = {
		title : "RISK FACTOR"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	// $.contactWin.rightNavButton = rightNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});
}
