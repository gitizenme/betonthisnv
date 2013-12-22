
function clickBack(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	$.navGroup.close();
    $.About.close();
}

var androidBackButtonClicked = false;

function onAndroidBack() {
	Ti.API.debug('About.' + arguments.callee.name);
	androidBackButtonClicked = true;
}


function clickBackAndroid(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
    $.navGroupWidget.close();
	androidBackButtonClicked = true;
}

var leftNavButton = Ti.UI.createButton({
    title : 'Back'
});
leftNavButton.addEventListener('click', clickBack);

function onTheWebClick(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	Ti.Platform.openURL(Ti.App.url);
}

function onTheWebIzenMeClick(e) {
	Ti.API.debug('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	Ti.Platform.openURL("http://www.izen.me");
}

/*
var rightNavButton = Ti.UI.createButton({
    title : 'Send'
});
rightNavButton.addEventListener('click', clickSend);
*/

function open() {
    Ti.API.trace('About.' + arguments.callee.name);
    
    $.versionLabel.text += Alloy.Globals.version;
    $.descriptionLabel.text += Ti.App.description;
    $.copyrightLabel.text += Ti.App.copyright;
    $.publisherLabel.text += Ti.App.publisher;
    $.urlLabel.text += Ti.App.url;    
    
	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

if (OS_ANDROID) {

	function stopActivityAndroid(e) {
		Ti.API.trace('About.' + arguments.callee.name + ': ' + JSON.stringify(e));
	    $.navGroupWidget.close();
	    if(!androidBackButtonClicked) {
			Alloy.Globals.AuthenticateOnResume = true;
	    }
	}

}


if (OS_ANDROID) {
    $.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
	var args = {
		title : "ABOUT"
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();
    $.navWin.leftNavButton = leftNavButton;
    // $.contactWin.rightNavButton = rightNavButton;
    $.navGroupWidget.init($.navGroup, {});
    $.navGroupWidget.open($.navWin, {});
}
