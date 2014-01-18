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

$.openAndroidView = false;

$.navGroup = navGroup;

function open() {
	Ti.API.debug('AlcoholTobacco.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_ACTIVITY,
		type : types.SECTION_ACTIVITY_ALCOHOL_TOBACCO
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('AlcoholTobacco.' + arguments.callee.name + ": model = " + JSON.stringify(entry));
		var textAreaComment = $.alcoholTobaccoCommonView.getView('textArea');
		textAreaComment.value = entry.data;
	}

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('AlcoholTobacco.' + arguments.callee.name);

	var textAreaComment = $.alcoholTobaccoCommonView.getView('textArea');
	var modelDate = moment();

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_ACTIVITY,
		type : types.SECTION_ACTIVITY_ALCOHOL_TOBACCO
	});
	if (existingJournalModel.length == 1) {
		existingJournalModel[0].save({
			editDate : modelDate.toISOString(),
			displayData : textAreaComment.value,
			data : textAreaComment.value
		});
	} else if (existingJournalModel.length == 0) {
		var entry = Alloy.createModel('journal', {
			editDate : modelDate.toISOString(),
			sortDate : sortDate.format("YYYY/MM/DD"),
			displayData : textAreaComment.value,
			data : textAreaComment.value,
			section : types.SECTION_ACTIVITY,
			type : types.SECTION_ACTIVITY_ALCOHOL_TOBACCO
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('AlcoholTobacco.' + arguments.callee.name + ": more than one entry for section/type ");
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('AlcoholTobacco.' + arguments.callee.name);
		$.openAndroidView = true;
		Alloy.Globals.AuthenticateOnResume = false;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('AlcoholTobacco.' + arguments.callee.name + ': ' + JSON.stringify(e));
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
		title : winTitle || "ALCOHOL TOBACCO"
	};

	function clickSave(e) {
		Ti.API.debug('AlcoholTobacco.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		$.AlcoholTobacco.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.AlcoholTobacco.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.AlcoholTobacco.rightNavButton = rightNavButton;
}
