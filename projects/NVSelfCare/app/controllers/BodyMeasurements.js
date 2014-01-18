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

var textFieldBustSize = $.bodyMeasurementsCommonView.getView('textFieldBustSize');
var textFieldWaistSize = $.bodyMeasurementsCommonView.getView('textFieldWaistSize');
var textFieldHipSize = $.bodyMeasurementsCommonView.getView('textFieldHipSize');

function open() {
	Ti.API.debug('BodyMeasurements.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_HEALTH,
		type : types.SECTION_HEALTH_MEASUREMENTS
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('BodyMeasurements.' + arguments.callee.name + ": model = " + JSON.stringify(entry));

		var apptData = null;
		try {
			var apptData = JSON.parse(entry.data);
		} catch(e) {
			Ti.API.error(e);
		}

		if (apptData) {
			textFieldBustSize.value = apptData.bustSize;
			textFieldWaistSize.value = apptData.waistSize;
			textFieldHipSize.value = apptData.hipSize;
		}
	}

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('BodyMeasurements.' + arguments.callee.name);

	var textFieldBustSize = $.bodyMeasurementsCommonView.getView('textFieldBustSize');
	var textFieldWaistSize = $.bodyMeasurementsCommonView.getView('textFieldWaistSize');
	var textFieldHipSize = $.bodyMeasurementsCommonView.getView('textFieldHipSize');
	var modelDate = moment();

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_HEALTH,
		type : types.SECTION_HEALTH_MEASUREMENTS
	});

	var displayData = 'Body Measurements';

	var dataToStore = {
		bustSize : textFieldBustSize.value,
		waistSize : textFieldWaistSize.value,
		hipSize : textFieldHipSize.value
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
			section : types.SECTION_HEALTH,
			type : types.SECTION_HEALTH_MEASUREMENTS
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('BodyMeasurements.' + arguments.callee.name + ": more than one entry for section/type ");
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('BodyMeasurements.' + arguments.callee.name);
		openAndroidView = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('BodyMeasurements.' + arguments.callee.name + ': ' + JSON.stringify(e));
		if (!openAndroidView) {
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
		title : winTitle || "BLOOD PRESESSURE"
	};

	function clickSave(e) {
		Ti.API.debug('BodyMeasurements.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		$.BodyMeasurements.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.BodyMeasurements.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.BodyMeasurements.rightNavButton = rightNavButton;
}
