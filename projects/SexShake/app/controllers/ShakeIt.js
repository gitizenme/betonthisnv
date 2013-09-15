
$.sex_shake_web.init($.shakeItWin);
$.sex_shake_web.on('click', function(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 0
    };
    var win1 = Alloy.createController('BetOnThisNVWebView', arg).getView();
});


function init() {
	Ti.API.trace('ShakeIt.' + arguments.callee.name);
	$.reels.init();
}

function open() {
	init();
}
