function showLeavingAppAlert(targetUrl) {
	if (OS_ANDROID) {
		var msg = "You are now leaving the SexSafe app and visiting " + targetUrl + ". To return to the app, press the back button on your phone.";
	}
	if (OS_IOS) {
		var msg = "You are now leaving the SexSafe app and visiting " + targetUrl + ". To return to the app, double tap the home button on your phone.";
	}

	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Continue', 'Cancel'],
		message : msg,
		title : Ti.App.name
	});
	dialog.addEventListener('click', function(e) {
		if (e.index !== e.source.cancel) {
			Ti.Platform.openURL(targetUrl);
		}
	});
	dialog.show();

}

function onTheWebClick(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	showLeavingAppAlert(Ti.App.url);
}

function onTheWebIzenMeClick(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	showLeavingAppAlert("http://www.izen.me");
}

var androidBackButtonClicked = false;

function open() {
	Ti.API.trace('About.' + arguments.callee.name);

	$.versionLabel.text += Alloy.Globals.version;
	$.descriptionLabel.text += Ti.App.description;
	$.copyrightLabel.text += Ti.App.copyright;
	$.publisherLabel.text += Ti.App.publisher;
	$.urlLabel.text += Ti.App.url;

	$.disclaimerLabel.text = 'Legal Disclaimer\nPlease read this agreement entirely and carefully before accessing this web site. By accessing the site, you agree to be bound by the terms and conditions below. If you do not wish to be bound by these terms and conditions, you may not access or use this site or its associated applications (NVSexSafe/NVSelfCare applications for Android and iOS).\n\nNo medical advice.\nThe information posted here should not be considered medical advice and is not intended to replace consultation with a qualified healthcare professional.\n\nNo warranties.\nThis web site and its associated applications are provided on an "as is" on an "as available" basis without warranties of any kind, express or implied, including, but not limited to, those of title, merchantability, fitness for a particular purpose or non-infringement or any warranty arising from a course of dealing, usage, or trade practice. No oral advice or written information provided by Universal Web Solutions Canada shall create a warranty; nor shall members or visitors to the site and users of its associated applications rely on any such information or advice.\n\nDisclaimer of Liability.\nThe user assumes all responsibility and risk for the use of this web site and its associated applications. Under no circumstances, including negligence, shall the Nevada Coalition for Safe Sex or anyone else involved in creating or maintaining this web site and its associated applications be liable for any direct, indirect, incidental, special or consequential damages, that may result from the use or inability to use the web site and its associated applications. Nor shall Nevada Coalition for Safe Sex be liable for any such damages including, but not limited to, reliance by a member or visitor on any information obtained via the web site and its associated applications; or that result from mistakes, omissions, interruptions, deletion of files, viruses, errors, defects, or any failure of performance, communications failure, theft, destruction or unauthorized access. In jurisdictions where aforementioned limitations on liability are not allowed to the extent described, our liability shall be limited to the greatest extent allowed by law.\n\nTHESE LEGAL NOTICES ARE SUBJECT TO CHANGE WITHOUT NOTICE.';

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('About.' + arguments.callee.name);
		androidBackButtonClicked = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.trace('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroupWidget.close();
		if (!androidBackButtonClicked) {
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}


	$.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
	function clickBack(e) {
		Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
	}

	var leftNavButton = Ti.UI.createButton({
		title : 'Back'
	});
	leftNavButton.addEventListener('click', clickBack);

	var args = {
		title : "ABOUT"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
	$.navWin.leftNavButton = leftNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});
}

