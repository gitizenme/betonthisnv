/**
 * @author Joe Chavez
 */

var moment = require('alloy/moment');
var types = require('types');

var args = arguments[0] || {};

var journal = Alloy.Collections.journal;
journal.fetch();

var navGroup = args.navGroup || null;
var winTitle = args.title || null;
var sortDate = args.modelDate || null;

var openAndroidView = false;

$.navGroup = navGroup;

var dateTimeField = $.medicationCommonView.getView('dateTimeField');
var saveToCalendar = $.medicationCommonView.getView('saveToCalendar');

function open() {
	Ti.API.debug('Medication.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_ALERTS,
		type : types.SECTION_ALERTS_MEDICATION
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('Medication.' + arguments.callee.name + ": model = " + JSON.stringify(entry));

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
	Ti.API.debug('Medication.' + arguments.callee.name);

	Ti.API.debug('Medication.' + arguments.callee.name + ', dateTimeField.value =' + dateTimeField.value);
	Ti.API.debug('Medication.' + arguments.callee.name + ', saveToCalendar.value =' + saveToCalendar.value);

	if(!moment( dateTimeField.value).isValid()) {
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
		type : types.SECTION_ALERTS_MEDICATION
	});

	var dataToStore = {
		dateTime : dateTimeField.value,
		saveToCalendar : saveToCalendar.value
	};

	if (existingJournalModel.length == 1) {
		existingJournalModel[0].save({
			editDate : modelDate.toISOString(),
			displayData : 'Medication:' + dateTimeField.value,
			data : JSON.stringify(dataToStore)
		});
	} else if (existingJournalModel.length == 0) {
		var entry = Alloy.createModel('journal', {
			editDate : modelDate.toISOString(),
			sortDate : sortDate.format("YYYY/MM/DD"),
			displayData : 'Medication:' + dateTimeField.value,
			data : JSON.stringify(dataToStore),
			section : types.SECTION_ALERTS,
			type : types.SECTION_ALERTS_MEDICATION
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('Medication.' + arguments.callee.name + ": more than one entry for section/type ");
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
	if (OS_IOS) {
		$.Medication.close();
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('Medication.' + arguments.callee.name);
		openAndroidView = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('Medication.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (!openAndroidView) {
			Alloy.Globals.AuthenticateOnResume = true;
			$.navWin.close();
		} else {
			$.navWin.close();
		}
	}

	$.navWin.title =  winTitle || $.navWin.title;

	$.navGroup.open($.navWin, {});
}

if (OS_IOS) {
	var titleArgs = {
		title : winTitle || "Medication"
	};

	function clickSave(e) {
		Ti.API.debug('Medication.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.Medication.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.Medication.rightNavButton = rightNavButton;
}
