var animation = require('alloy/animation');

function updateHintLabel(msg, duration) {
    Ti.API.trace('contact.' + arguments.callee.name);
    $.hintLabel.opacity = 0.0;
    animation.fadeIn($.hintLabel, duration);
    $.hintLabel.text = msg;
}

function clickSend(e) {
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = "[BetOnThisNV - NVSexSafe] Get Help";
    emailDialog.bccRecipients = ['info@izen.me']; // TODO change this
    emailDialog.html = true;
    emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;
    emailDialog.open();
    if(OS_ANDROID) {
    	$.contactNavGroup.close();
    }
    else {
    	$.contact.close();
    }
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
leftNavButton.addEventListener('click', clickBack);

var rightNavButton = Ti.UI.createButton({
    title : 'Send'
});
rightNavButton.addEventListener('click', clickSend);

function open() {
    Ti.API.trace('contact.' + arguments.callee.name);

    // $.navGroupWin.tabBarHidden = false;

    // $.navGroupWin.rightNavButton = rightNavButton;
    updateHintLabel('Fill out the information below and touch the Send button.', 750);
}

if (OS_ANDROID) {
    $.contactNavGroup.open($.contactWin, {});
}

if (OS_IOS) {
    $.contactWin.leftNavButton = leftNavButton;
    $.contactWin.rightNavButton = rightNavButton;
    $.contactNavGroup.init($.navGroup, {});
    $.contactNavGroup.open($.contactWin, {});
}
