
function clickBack(e) {
    $.BetOnThisNVWebView.close();
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

function open() {
    Ti.API.trace('BetOnThisNVWebView.' + arguments.callee.name);
}

if (OS_ANDROID) {
    $.navGroupWidget.open($.navWin, {});
}

if (OS_IOS) {
    $.navWin.leftNavButton = leftNavButton;
    // $.contactWin.rightNavButton = rightNavButton;
    $.navGroupWidget.init($.navGroup, {});
    $.navGroupWidget.open($.navWin, {});
}
