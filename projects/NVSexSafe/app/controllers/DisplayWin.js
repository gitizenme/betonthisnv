var args = arguments[0] || {};

var win = args.win || null;

function clickBack(e) {
	$.navGroup.close();
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
			$.navGroup.close();
		}
		alert("Unable to display win!");
	} else {
		$.orientationBody.text = win.orientation;
		$.activityBody.text = win.activity;
		$.protectionBody.text = win.protection;
		$.riskBody.text = win.risk;

		if (win.safety != "") {

			if (OS_IOS) {

				var text = win.safety;

				if (Alloy.Globals.isIOS7) {
					var attr = Titanium.UI.iOS.createAttributedString({
						text : text,
						attributes : [
						// Underlines text
						{
							type : Titanium.UI.iOS.ATTRIBUTE_UNDERLINES_STYLE,
							value : Titanium.UI.iOS.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
							range : [text.indexOf("http://"), 51]
						},
						// Sets a foreground color
						{
							type : Titanium.UI.iOS.ATTRIBUTE_FOREGROUND_COLOR,
							value : "blue",
							range : [text.indexOf("http://"), 51]
						}]
					});
					$.safetyBody.attributedString = attr;
				} else {
					$.safetyBody.text = text;
				}
			}
			if (OS_ANDROID) {
				$.safetyBody.text = win.safety;
			}

		} else {
			var text = "There is not safety information for this SexSafe activity. Checkout ☞ http://www.betonthisnv.org for more information.";

			if (OS_IOS) {

			}
			if (OS_ANDROID) {
				$.safetyBody.text = text;
			}

		}
	}
}

if (OS_ANDROID) {
	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {

	function openUrl(e) {
		if (Alloy.Globals.isIOS7) {
			if ($.safetyBody.attributedString.text.indexOf("http://") != -1) {
				Ti.API.debug('DisplayWin.' + arguments.callee.name + ': ' + JSON.stringify(e));
				Ti.Platform.openURL("http://betonthisnv.org/Protect/How_to_Use_a_Condom/");
			}
		}
		else {
			if ($.safetyBody.text.indexOf("http://") != -1) {
				Ti.API.debug('DisplayWin.' + arguments.callee.name + ': ' + JSON.stringify(e));
				Ti.Platform.openURL("http://betonthisnv.org/Protect/How_to_Use_a_Condom/");
			}
		}
	}

	var args = {
		title : "RISK FACTOR"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	// $.contactWin.rightNavButton = rightNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});

	$.safetyBody.addEventListener('click', openUrl);
}
