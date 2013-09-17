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

function clickBackAndroid(e) {
    $.contactNavGroup.close();
}

var leftNavButton = Ti.UI.createButton({
    title : 'Back'
});
leftNavButton.title = 'Back';
leftNavButton.addEventListener('click', clickBack);

function open() {
    Ti.API.trace('contact.' + arguments.callee.name);

    // $.navGroupWin.tabBarHidden = false;

    // $.navGroupWin.rightNavButton = rightNavButton;
    updateHintLabel('Contact View', 750);
}

if (OS_ANDROID) {
    $.contactNavGroup.open($.contactWin, {});
}

if (OS_IOS) {
    $.contactWin.leftNavButton = leftNavButton;
    $.contactNavGroup.init($.navGroup, {});
    $.contactNavGroup.open($.contactWin, {});
}
