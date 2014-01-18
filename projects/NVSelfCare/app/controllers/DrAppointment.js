/**
 * @author Joe Chavez
 */

var moment = require('alloy/moment');
var types = require('types');
var CalendarUtils = require('CalendarUtils');

var calendarUtil = new CalendarUtils();

var args = arguments[0] || {};

var journal = Alloy.Collections.journal;
journal.fetch();

var navGroup = args.navGroup || null;
var winTitle = args.title || null;
var sortDate = args.modelDate || null;

$.openAndroidView = false;

$.navGroup = navGroup;

var dateTimeField = $.drAppointmentCommonView.getView('dateTimeField');
var saveToCalendar = $.drAppointmentCommonView.getView('saveToCalendar');

function open() {
	Ti.API.debug('DrAppointment.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_ALERTS,
		type : types.SECTION_ALERTS_DR_APPT
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('DrAppointment.' + arguments.callee.name + ": model = " + JSON.stringify(entry));

		var apptData = null;
		try {
			var apptData = JSON.parse(entry.data);
		} catch(e) {
			Ti.API.error(e);
		}

		if (apptData) {
			dateTimeField.value = apptData.dateTime;
			saveToCalendar.value = apptData.saveToCalendar;
		}
	}

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('DrAppointment.' + arguments.callee.name);

	Ti.API.debug('DrAppointment.' + arguments.callee.name + ', dateTimeField.value =' + dateTimeField.value);
	Ti.API.debug('DrAppointment.' + arguments.callee.name + ', saveToCalendar.value =' + saveToCalendar.value);

	if (!moment(dateTimeField.value).isValid()) {
		alert('Please check the date and time and try saving again.');
		dateTimeField.borderColor = 'red';
		dateTimeField.color = 'red';
		dateTimeField.focus();
		return;
	}

	var modelDate = moment();

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_ALERTS,
		type : types.SECTION_ALERTS_DR_APPT
	});

	var displayData = 'Dr. Appt:' + dateTimeField.value;

	var dataToStore = {
		dateTime : dateTimeField.value,
		saveToCalendar : saveToCalendar.value
	};

	if (existingJournalModel.length == 1) {
		existingJournalModel[0].save({
			editDate : modelDate.toISOString(),
			displayData : displayData,
			data : JSON.stringify(dataToStore)
		});
	} else if (existingJournalModel.length == 0) {
		var entry = Alloy.createModel('journal', {
			editDate : modelDate.toISOString(),
			sortDate : sortDate.format("YYYY/MM/DD"),
			displayData : displayData,
			data : JSON.stringify(dataToStore),
			section : types.SECTION_ALERTS,
			type : types.SECTION_ALERTS_DR_APPT
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('DrAppointment.' + arguments.callee.name + ": more than one entry for section/type ");
	}

	if (dataToStore.saveToCalendar) {

		var description = 'Created by NV SelfCare, last update ' + modelDate.format("dddd, MMMM Do YYYY, h:mm:ss a");

		var eventBegins = moment(dataToStore.dateTime).toDate();
		var eventEnds = moment(dataToStore.dateTime).add('h', 1).toDate();
		var details = {
			title : displayData,
			// description : description,
			begin : eventBegins,
			end : eventEnds
		};
		calendarUtil.addEventToCalendar(details);
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
	if (OS_IOS) {
		$.DrAppointment.close();
	}

}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('DrAppointment.' + arguments.callee.name);
		$.openAndroidView = true;
		Alloy.Globals.AuthenticateOnResume = false;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('DrAppointment.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (!$.openAndroidView) {
			Alloy.Globals.AuthenticateOnResume = true;
			$.navWin.close();
		} else {
			$.navWin.close();
		}
	}


	$.navWin.title = winTitle || $.navWin.title;

	$.navGroup.open($.navWin, {});
}

if (OS_IOS) {
	var titleArgs = {
		title : winTitle || "DrAppointment"
	};

	function clickSave(e) {
		Ti.API.debug('DrAppointment.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.DrAppointment.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.DrAppointment.rightNavButton = rightNavButton;
}
