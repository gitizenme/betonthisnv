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
	Ti.API.debug('dayComment.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_DIARY,
		type : types.SECTION_DIARY_COMMENT
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('Mood.' + arguments.callee.name + ": model = " + JSON.stringify(entry));
		var dayCommentTextArea = $.dayCommentCommonView.getView('textArea');
		dayCommentTextArea.value = entry.data;
	}

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('dayComment.' + arguments.callee.name);

	var dayCommentTextArea = $.dayCommentCommonView.getView('textArea');
	var modelDate = moment();

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_DIARY,
		type : types.SECTION_DIARY_COMMENT
	});
	if (existingJournalModel.length == 1) {
		existingJournalModel[0].save({
			editDate : modelDate.toISOString(),
			displayData : dayCommentTextArea.value,
			data : dayCommentTextArea.value
		});
	} else if (existingJournalModel.length == 0) {
		var entry = Alloy.createModel('journal', {
			editDate : modelDate.toISOString(),
			sortDate : sortDate.format("YYYY/MM/DD"),
			displayData : dayCommentTextArea.value,
			data : dayCommentTextArea.value,
			section : types.SECTION_DIARY,
			type : types.SECTION_DIARY_COMMENT
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('dayComment.' + arguments.callee.name + ": more than one entry for section/type ");
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('dayComment.' + arguments.callee.name);
		$.openAndroidView = true;
		Alloy.Globals.AuthenticateOnResume = false;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('dayComment.' + arguments.callee.name + ': ' + JSON.stringify(e));
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
		title : winTitle || "COMMENT"
	};

	function clickSave(e) {
		Ti.API.debug('dayComment.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		$.dayComment.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.dayComment.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.dayComment.rightNavButton = rightNavButton;
}
