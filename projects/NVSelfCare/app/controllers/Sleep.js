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

function open() {
	Ti.API.debug('Sleep.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_HEALTH,
		type : types.SECTION_HEALTH_SLEEP
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('Sleep.' + arguments.callee.name + ": model = " + JSON.stringify(entry));
		var textAreaContent = $.sleepCommonView.getView('textField');
		textAreaContent.value = entry.data;
	}

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('Sleep.' + arguments.callee.name);

	var textAreaContent = $.sleepCommonView.getView('textField');
	var modelDate = moment();

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_HEALTH,
		type : types.SECTION_HEALTH_SLEEP
	});
	if (existingJournalModel.length == 1) {
		existingJournalModel[0].save({
			editDate : modelDate.toISOString(),
			displayData : textAreaContent.value,
			data : textAreaContent.value
		});
	} else if (existingJournalModel.length == 0) {
		var entry = Alloy.createModel('journal', {
			editDate : modelDate.toISOString(),
			sortDate : sortDate.format("YYYY/MM/DD"),
			displayData : textAreaContent.value,
			data : textAreaContent.value,
			section : types.SECTION_HEALTH,
			type : types.SECTION_HEALTH_SLEEP
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('Sleep.' + arguments.callee.name + ": more than one entry for section/type ");
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('Sleep.' + arguments.callee.name);
		openAndroidView = true;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('Sleep.' + arguments.callee.name + ': ' + JSON.stringify(e));
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
		title : winTitle || "SLEEP"
	};

	function clickSave(e) {
		Ti.API.debug('Sleep.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		$.Sleep.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.Sleep.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.Sleep.rightNavButton = rightNavButton;
}
