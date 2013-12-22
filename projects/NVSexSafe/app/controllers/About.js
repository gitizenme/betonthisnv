
function clickBack(e) {
	$.navGroup.close();
    $.About.close();
}

function clickBackAndroid(e) {
    $.navGroupWidget.close();
}

var leftNavButton = Ti.UI.createButton({
    title : 'Back'
});
leftNavButton.addEventListener('click', clickBack);

function onTheWebClick(e) {
	Ti.Platform.openURL(Ti.App.url);
}

function onTheWebIzenMeClick(e) {
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
