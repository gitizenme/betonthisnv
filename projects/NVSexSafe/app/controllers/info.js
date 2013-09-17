

$.info_web.init($.info);
$.info_web.on('click', function(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 0
    };
    var win2 = Alloy.createController('BetOnThisNVWebView', arg).getView();
});


function getTestedClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 1
    };
    var win3 = Alloy.createController('BetOnThisNVWebView', arg).getView();
}

function findCondomsClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    var arg = {
        targetPage : 2
    };
    var win4 = Alloy.createController('BetOnThisNVWebView', arg).getView();
}

function emailSendComplete(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
    if (e.success) {
        alert("Message sent!");
    }
    else {
        alert("Unable to send message, please try again later.");
    }
}

function getHelpClicked(e) {
	Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));

	var args = {
	};


	var contactController = Alloy.createController('contact', args);

	if(OS_IOS) {
		contactController.getView().open();
	}
}
