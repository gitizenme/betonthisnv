var moment = require('alloy/moment');
var animation = require('alloy/animation');

var args = arguments[0] || {};

var selectedDate = args.day || 'XX/XX/XXXX';

$.openAndroidView = false;

var day_view_itemClick = {
	"section" : {
		"id" : "__alloyId12"
	},
	"sectionIndex" : 0,
	"bindId" : "es_info",
	"itemIndex" : 0,
	"accessoryClicked" : false,
	"bubbles" : true,
	"type" : "itemclick",
	"source" : {
		"canScroll" : true,
		"id" : "listView",
		"caseInsensitiveSearch" : true,
		"horizontalWrap" : true,
		"defaultItemTemplate" : "template",
		"dictTemplates" : {
			"template" : {}
		}
	},
	"cancelBubble" : false
};

var SECTION_DIARY = 0;
var SECTION_ALERTS = 1;
var SECTION_HEALTH = 2;
var SECTION_ACTIVITY = 3;

function sectionDiaryClick(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));

	$.openAndroidView = true;

	switch(e.itemIndex) {
		case 0:
			// comment - text field
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "COMMENT"
			};
			var controller = Alloy.createController('dayComment', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 1:
			// mood - list view
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "MOOD"
			};
			var controller = Alloy.createController('Mood', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		default:
			$.openAndroidView = false;
	}

}

function sectionAlertsClick(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));

	$.openAndroidView = true;

	switch(e.itemIndex) {
		case 0:
			// Dr.Appointment - date picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "DR APPPOINTMENT"
			};
			var controller = Alloy.createController('DrAppointment', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 1:
			// medication - date picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "MEDICATION"
			};
			var controller = Alloy.createController('Medication', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 2:
			// alarm - date picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "ALARM"
			};
			var controller = Alloy.createController('Alarm', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		default:
			$.openAndroidView = false;
	}
}

function sectionHealthClick(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));

	$.openAndroidView = true;

	switch(e.itemIndex) {
		case 0:
			// T-cell - text field
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "T-CELL COUNT"
			};
			var controller = Alloy.createController('TCell', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 1:
			// weight - picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "WEIGHT"
			};
			var controller = Alloy.createController('Weight', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 2:
			// sleep - text field 
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "SLEEP"
			};
			var controller = Alloy.createController('Sleep', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 3:
			// fatigue - list view
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "FATIGUE"
			};
			var controller = Alloy.createController('Fatigue', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 4:
			// blood pressure - picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "BLOOD PRESSURE"
			};
			var controller = Alloy.createController('BloodPressure', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 5:
			// body measurements - text fields
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "MEASUREMENTS"
			};
			var controller = Alloy.createController('BodyMeasurements', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		default:
			$.openAndroidView = false;
	}
}

function sectionActivityClick(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));

	$.openAndroidView = true;

	switch(e.itemIndex) {
		case 0:
			// had sex - check indicator
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "HAD SEX"
			};
			var controller = Alloy.createController('HadSex', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 1:
			// Alcohol/tobacco - list view with checks
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "ALCOHOL/TOBACCO"
			};
			var controller = Alloy.createController('AlcoholTobacco', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case 2:
			// Other abuse - text area
			var openArgs = {
				navGroup : $.navGroupWidget,
				title : "OTHER USE"
			};
			var controller = Alloy.createController('OtherSubstances', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		default:
			$.openAndroidView = false;
	}
}

function itemClick(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));

	switch(e.sectionIndex) {
		case SECTION_DIARY:
			sectionDiaryClick(e);
			break;
		case SECTION_ALERTS:
			sectionAlertsClick(e);
			break;
		case SECTION_HEALTH:
			sectionHealthClick(e);
			break;
		case SECTION_ACTIVITY:
			sectionActivityClick(e);
			break;
		default:
			Ti.API.warn('Undefined section: ' + e.sectionIndex);
	}

}

function open(args) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(args));

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
		$.navWin.activity.addEventListener('restart', restartActivityAndroid);
		$.navWin.activity.addEventListener('pause', pauseActivityAndroid);
		$.navWin.activity.addEventListener('resume', resumeActivityAndroid);
	}
}

if (OS_ANDROID) {
	$.navGroupWidget.open($.navWin, {});
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('day_view.' + arguments.callee.name);
		$.openAndroidView = true;
		$.navWin.close();
	}

	function resumeActivityAndroid(e) {
		Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function pauseActivityAndroid(e) {
		Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function restartActivityAndroid(e) {
		Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (Alloy.Globals.AuthenticateOnResume) {
			$.navWin.close();
		}
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (!$.openAndroidView) {
			// $.navWin.close();
			Alloy.Globals.AuthenticateOnResume = true;
		} else {
			// $.navWin.close();
		}
	}

}

if (OS_IOS) {

	function clickBack(e) {
		Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
		$.day_view.close();
	}

	var leftNavButton = Alloy.createController('navBarButton').getView();
	leftNavButton.title = 'Close';
	leftNavButton.addEventListener('click', clickBack);

	// var rightNavButton = Alloy.createController('navBarButton').getView();
	// rightNavButton.title = 'Save';
	// rightNavButton.addEventListener('click', clickSave);

	var args = {
		title : selectedDate.format("M/D/YYYY")
	};
	$.navWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.navWin.leftNavButton = leftNavButton;
	$.navGroupWidget.init($.navGroup, {});
	$.navGroupWidget.open($.navWin, {});
}
