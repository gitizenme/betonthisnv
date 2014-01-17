var moment = require('alloy/moment');
var animation = require('alloy/animation');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

var args = arguments[0] || {};

var selectedDate = args.day || 'XX/XX/XXXX';

$.openAndroidView = false;

var listView = $.listView.getView('theList');

function updateListViewRow(entry) {
	Ti.API.debug('day_view.' + arguments.callee.name);

	if (listView && (entry.section < listView.sections.length) && entry.type < listView.sections[entry.section].items.length) {
		var section = listView.sections[entry.section];
		var listDataItem = section.items[entry.type];

		var dateSaved = moment(entry.editDate);
		listDataItem.subinfo.text = "Updated " + dateSaved.fromNow();
		listDataItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_DETAIL;
		listDataItem.info.text = entry.displayData;

		if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_MOOD) {
			listDataItem.pic.image = types.moodImages[parseInt(entry.data)];
		}

		section.updateItemAt(entry.type, listDataItem);
	}

}

function closeLoader() {
	// Alloy.Globals.loader.Close();
}

function loadModelIntoListView() {
	Ti.API.debug('day_view.' + arguments.callee.name);
	journal.fetch();

	var existingJournalModel = journal.where({
		sortDate : selectedDate.format("M/D/YYYY")
	});

	for (var i = 0, j = existingJournalModel.length; i < j; i++) {
		var entry = existingJournalModel[i];
		updateListViewRow(entry.attributes);
	};

 	setTimeout(closeLoader, 500);

}

function journalChanged(context) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(context));

	updateListViewRow(context.attributes);
}

journal.on('change', journalChanged);

function sectionDiaryClick(e) {
	Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));

	$.openAndroidView = true;

	switch(e.itemIndex) {
		case types.SECTION_DIARY_COMMENT:
			// comment - text field
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "COMMENT"
			};
			var controller = Alloy.createController('dayComment', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_DIARY_MOOD:
			// mood - list view
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
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
		case types.SECTION_ALERTS_DR_APPT:
			// Dr.Appointment - date picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "DR APPPOINTMENT"
			};
			var controller = Alloy.createController('DrAppointment', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_ALERTS_MEDICATION:
			// MEDICATION - date picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "MEDICATION"
			};
			var controller = Alloy.createController('Medication', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_ALERTS_ALERT:
			// alarm - date picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
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
		case types.SECTION_HEALTH_TCELL:
			// T-cell - text field
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "T-CELL COUNT"
			};
			var controller = Alloy.createController('TCell', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_HEALTH_WEIGHT:
			// weight - picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "WEIGHT"
			};
			var controller = Alloy.createController('Weight', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_HEALTH_SLEEP:
			// sleep - text field
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "SLEEP"
			};
			var controller = Alloy.createController('Sleep', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_HEALTH_FATIGUE:
			// fatigue - list view
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "FATIGUE"
			};
			var controller = Alloy.createController('Fatigue', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_HEALTH_BLOOD_PRESSURE:
			// blood pressure - picker
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "BLOOD PRESSURE"
			};
			var controller = Alloy.createController('BloodPressure', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_HEALTH_MEASUREMENTS:
			// body measurements - text fields
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
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
		case types.SECTION_ACTIVITY_HAD_SEX:
			// had sex - check indicator
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "HAD SEX"
			};
			var controller = Alloy.createController('HadSex', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_ACTIVITY_ALCOHOL_TOBACCO:
			// Alcohol/tobacco - list view with checks
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
				title : "ALCOHOL/TOBACCO"
			};
			var controller = Alloy.createController('AlcoholTobacco', openArgs);
			if (OS_IOS) {
				$.navGroup.openWindow(controller.getView(), openArgs);
			}
			break;
		case types.SECTION_ACTIVITY_OTHER:
			// Other abuse - text area
			var openArgs = {
				navGroup : $.navGroupWidget,
				modelDate : selectedDate,
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
		case types.SECTION_DIARY:
			sectionDiaryClick(e);
			break;
		case types.SECTION_ALERTS:
			sectionAlertsClick(e);
			break;
		case types.SECTION_HEALTH:
			sectionHealthClick(e);
			break;
		case types.SECTION_ACTIVITY:
			sectionActivityClick(e);
			break;
		default:
			Ti.API.warn('Undefined section: ' + e.sectionIndex);
	}

}


function open() {
	Ti.API.debug('day_view.' + arguments.callee.name);

	setTimeout(loadModelIntoListView, 700);

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
		$.navWin.activity.addEventListener('restart', restartActivityAndroid);
		$.navWin.activity.addEventListener('pause', pauseActivityAndroid);
		$.navWin.activity.addEventListener('resume', resumeActivityAndroid);

		// Action Bar
		if (Alloy.Globals.Android.Api >= 11 && $.navWin.activity.actionBar != null) {
			$.navWin.activity.actionBar.title = 'Day View - ' + selectedDate.format("M/D/YYYY");
		} else {
			$.navWin.title = 'Day View - ' + selectedDate.format("M/D/YYYY");
		}
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
		closeLoader();
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
			Alloy.Globals.AuthenticateOnResume = true;
		}
	}

}

if (OS_IOS) {

	function clickBack(e) {
		Ti.API.debug('day_view.' + arguments.callee.name + ': ' + JSON.stringify(e));
		$.navGroup.close();
		closeLoader();
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
