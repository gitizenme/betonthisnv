/**
 * @author Joe Chavez
 */

var moment = require('alloy/moment');
var animation = require('alloy/animation');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

var args = arguments[0] || {};

var navGroup = args.navGroup || null;
var winTitle = args.title || null;
var sortDate = args.modelDate || null;

$.openAndroidView = false;

$.navGroup = navGroup;

var sectionIndex = 0;
var itemIndex = 0;

function open() {
	Ti.API.debug('Mood.' + arguments.callee.name);

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_DIARY,
		type : types.SECTION_DIARY_MOOD
	});

	if (existingJournalModel.length == 1) {
		var entry = existingJournalModel[0].attributes;
		Ti.API.debug('Mood.' + arguments.callee.name + ": model = " + JSON.stringify(entry));

		sectionIndex = 0;
		itemIndex = parseInt(entry.data);
		var listView = $.listView.getView('theList');

		var section = listView.sections[0];
		var listDataItem = section.items[itemIndex];

		var dateSaved = moment(entry.editDate);
		Ti.API.debug('Mood.' + arguments.callee.name + ": dateSaved = " + dateSaved.toString());

		listDataItem.subinfo.text = "Selected " + dateSaved.fromNow();
		listDataItem.template = 'selected';
		listDataItem.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;

		section.updateItemAt(itemIndex, listDataItem);
		listView.scrollToItem(0, itemIndex);
	}

	if (OS_ANDROID) {
		$.navWin.activity.addEventListener('stop', stopActivityAndroid);
	}
}

function save() {
	Ti.API.debug('Mood.' + arguments.callee.name);

	var modelDate = moment();
	var listView = $.listView.getView('theList');
	var section = listView.sections[sectionIndex];
	var listDataItem = section.items[itemIndex];

	var existingJournalModel = journal.where({
		sortDate : sortDate.format("YYYY/MM/DD"),
		section : types.SECTION_DIARY,
		type : types.SECTION_DIARY_MOOD
	});

	if (existingJournalModel.length == 1) {
		existingJournalModel[0].save({
			editDate : modelDate.toISOString(),
			displayData : listDataItem.info.text || 'Mood',
			data : itemIndex
		});
	} else if (existingJournalModel.length == 0) {
		var entry = Alloy.createModel('journal', {
			editDate : modelDate.toISOString(),
			sortDate : sortDate.format("YYYY/MM/DD"),
			displayData : listDataItem.info.text || 'Mood',
			data : itemIndex,
			section : types.SECTION_DIARY,
			type : types.SECTION_DIARY_MOOD
		});
		journal.add(entry);
		entry.save();
	} else {
		Ti.API.warn('Mood.' + arguments.callee.name + ": more than one entry for section/type ");
	}
	if (OS_ANDROID) {
		onAndroidBack();
	}
}

var itemClick = {
	"section" : {
		"id" : "__alloyId68"
	},
	"sectionIndex" : 0,
	"itemIndex" : 3,
	"accessoryClicked" : false,
	"bubbles" : true,
	"type" : "itemclick",
	"source" : {
		"canScroll" : true,
		"id" : "theList",
		"caseInsensitiveSearch" : true,
		"horizontalWrap" : true,
		"defaultItemTemplate" : "template",
		"dictTemplates" : {
			"template" : {}
		}
	},
	"cancelBubble" : false
};

function itemClick(e) {
	Ti.API.debug('Mood.' + arguments.callee.name + ': ' + JSON.stringify(e));

	sectionIndex = e.sectionIndex;
	itemIndex = e.itemIndex;

	var listView = $.listView.getView('theList');
	var section = listView.sections[sectionIndex];

	for (var i = 0, j = section.items.length; i < j; i++) {
		var item = section.getItemAt(i);
		if (i == itemIndex && item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			item.template = 'selected';
		} else {
			item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			item.template = 'normal';
		}
		section.updateItemAt(i, item);
	}

}

if (OS_ANDROID) {
	function onAndroidBack() {
		Ti.API.debug('Mood.' + arguments.callee.name);
		$.openAndroidView = true;
		Alloy.Globals.AuthenticateOnResume = false;
		$.navWin.close();
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('Mood.' + arguments.callee.name + ': ' + JSON.stringify(e));
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
		title : winTitle || "Mood"
	};

	function clickSave(e) {
		Ti.API.debug('Mood.' + arguments.callee.name + ': ' + JSON.stringify(e));
		save();
		$.Mood.close();
	}

	var rightNavButton = Ti.UI.createButton({
		title : 'Save',
		systemButton : Ti.UI.iPhone.SystemButton.SAVE
	});
	rightNavButton.addEventListener('click', clickSave);

	$.Mood.titleControl = Alloy.createController('NavTitleControl', titleArgs).getView();
	$.Mood.rightNavButton = rightNavButton;
}
