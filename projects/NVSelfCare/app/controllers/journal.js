var moment = require('alloy/moment');
var animation = require('alloy/animation');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

var searchBar;

function journalChanged(context) {
	Ti.API.debug('journal.' + arguments.callee.name + ': ' + JSON.stringify(context));
	loadData();
	// updateListViewRow(context.attributes);
}

journal.on('change', journalChanged);

if (OS_IOS) {
	var args = {
		title : "JOURNAL"
	};
	$.tabWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.tabWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
	$.tabWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
}

function loadData() {
	Ti.API.debug('journal.' + arguments.callee.name);

	var sections = [];

	/*
	 var journalSortedByDate = journal.sortBy(function(model) {
	 return moment(model.attributes.sortDate, "YYYY/MM/DD").toDate();
	 });
	 */

	var journalGroupedByDate = journal.groupBy(function(model) {
		return model.attributes.sortDate;
	});

	for (var key in journalGroupedByDate) {
		var dateGroup = journalGroupedByDate[key];
		var section = Ti.UI.createListSection({
			headerTitle : moment(key).calendar()
		});

		var dataSet = [];
		for (var dgIdx = 0, dgIdxLength = dateGroup.length; dgIdx < dgIdxLength; dgIdx++) {
			var entry = dateGroup[dgIdx].attributes;
			var rowProps = {
				backgroundColor : "#5AAFB5",
				selectedBackgroundColor : "#6CD1D7",
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL,
				modelId : -1,
				searchableText : '',
				selectedDate : '',
				activityType : {}
			};
			rowProps.modelId = entry.journal_id;
			rowProps.activityType = types.activityTypes[entry.section][entry.type];

			var image = rowProps.activityType.image;
			if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_MOOD) {
				image = types.moodImages[parseInt(entry.data)];
			} else if (entry.section == types.SECTION_HEALTH && entry.type == types.SECTION_HEALTH_FATIGUE) {
				image = types.fatigueImages[parseInt(entry.data)];
			}

			rowProps.searchableText = moment(key).calendar() + " " + entry.displayData;
			rowProps.selectedDate = key;

			var item = {
				info : {
					text : entry.displayData,
				},
				subinfo : {
					text : "Updated " + moment(entry.editDate).fromNow()
				},
				pic : {
					image : image
				},
				properties : rowProps
			};
			dataSet.push(item);
		};

		section.setItems(dataSet);
		sections.push(section);
	};

	$.journalListView.setSections(sections);

	searchBar = Titanium.UI.createSearchBar({
		barColor : '#5AAFB5',
		color : '#2399A3',
		showCancel : true,
		height : '43dp',
		top : 0,
		hintText : 'Search by date or title'
	});
	searchBar.addEventListener('cancel', function() {
		searchBar.blur();
	});

	if (OS_IOS) {
		searchBar.addEventListener('change', function(e) {
			$.journalListView.searchText = e.value;
		});
		$.journalListView.headerView = searchBar;
	}
	if (OS_ANDROID) {
		$.journalListView.searchView = searchBar;
	}

}

var iosClick = {
	"section" : {},
	"sectionIndex" : 0,
	"bindId" : "info",
	"itemIndex" : 0,
	"accessoryClicked" : false,
	"bubbles" : true,
	"type" : "itemclick",
	"source" : {
		"keepSectionsInSearch" : "true",
		"backgroundColor" : "#5AAFB5",
		"id" : "journalListView",
		"headerView" : {
			"hintText" : "Search by date or title",
			"barColor" : "#5AAFB5",
			"horizontalWrap" : true,
			"color" : "#2399A3",
			"top" : 0,
			"height" : "43dp",
			"showCancel" : true
		},
		"horizontalWrap" : true,
		"caseInsensitiveSearch" : "true",
		"dictTemplates" : {
			"template" : {}
		},
		"defaultItemTemplate" : "template",
		"canScroll" : true
	},
	"cancelBubble" : false
};

var androidClick = {
	"type" : "itemclick",
	"source" : {
		"backgroundRepeat" : false,
		"rect" : {
			"height" : 0,
			"y" : 0,
			"x" : 0,
			"width" : 0
		},
		"visible" : true,
		"size" : {
			"height" : 0,
			"y" : 0,
			"width" : 0,
			"x" : 0
		},
		"keepScreenOn" : false,
		"apiName" : "Ti.UI.ListItem",
		"children" : [],
		"enabled" : true,
		"bubbleParent" : true
	},
	"itemIndex" : 0,
	"sectionIndex" : 7,
	"section" : {
		"bubbleParent" : true,
		"footerView" : null,
		"headerTitle" : "02/06/2014",
		"items" : [{
			"subinfo" : {
				"text" : "Updated 16 hours ago"
			},
			"properties" : {
				"modelId" : 29,
				"accessoryType" : 2,
				"activityType" : {
					"image" : "/images/MoodNoneIcon.png",
					"controllerName" : "Mood",
					"title" : "MOOD"
				},
				"selectedDate" : "2014/02/06",
				"backgroundColor" : "#5AAFB5",
				"searchableText" : "02/06/2014 Happy",
				"selectedBackgroundColor" : "#6CD1D7"
			},
			"pic" : {
				"image" : "/images/MoodHappyIcon.png"
			},
			"info" : {
				"text" : "Happy"
			}
		}],
		"children" : [],
		"rect" : {
			"height" : 0,
			"y" : 0,
			"x" : 0,
			"width" : 0
		},
		"size" : {
			"height" : 0,
			"y" : 0,
			"width" : 0,
			"x" : 0
		},
		"keepScreenOn" : false,
		"headerView" : null,
		"apiName" : "Ti.UI.ListSection",
		"footerTitle" : null
	},
	"y" : 96,
	"x" : 1018,
	"bubbles" : true,
	"cancelBubble" : false
};

var XXXproperties = {
	"subinfo" : {
		"text" : "Updated 13 hours ago"
	},
	"pic" : {
		"image" : "/images/DrAppointmentIcon.png"
	},
	"info" : {
		"text" : "Dr. Appt:1/18/2014 8:45 PM"
	},
	"properties" : {
		"selectedBackgroundColor" : "#6CD1D7",
		"backgroundColor" : "#5AAFB5",
		"accessoryType" : 2,
		"selectedDate" : "2013/12/09",
		"activityType" : {
			"image" : "/images/DrAppointmentIcon.png",
			"title" : "DR APPPOINTMENT",
			"controllerName" : "DrAppointment"
		},
		"modelId" : 16,
		"searchableText" : "12/09/2013 Dr. Appt:1/18/2014 8:45 PM"
	}
};

function itemClick(e) {
	Ti.API.debug('journal.' + arguments.callee.name + ': ' + JSON.stringify(e));

	if (OS_ANDROID) {
		// Clear search bar
		searchBar.value = "";
		// hiding and showing the search bar forces it back to its non-focused appearance.
		searchBar.hide();
		searchBar.show();
	}

	var clickType = e.type;
	// var isAccessory = e.accessoryClicked;
	var itemForSection = $.journalListView.sections[e.sectionIndex].items[e.itemIndex];
	Ti.API.debug("journal: itemForSection = " + JSON.stringify(itemForSection));

	if (clickType == 'itemclick') {
		var itemProps = itemForSection.properties;

		var openArgs = {
			navGroup : $.navGroupWidget,
			modelDate : moment(itemProps.selectedDate),
			title : itemProps.activityType.title
		};
		var controller = Alloy.createController(itemProps.activityType.controllerName, openArgs);
		if (OS_IOS) {
			$.journal.open(controller.getView());
		}
	}

}

var Compression = require('me.izen.compression');
var outputDirectory = Ti.Filesystem.applicationDataDirectory + '/';
var tempDirectory = Ti.Filesystem.tempDirectory + '/';
var zipRootDir = 'package';
var password = 'YourPassword';

function createArchive(writeToZip) {
	Ti.API.trace('journal.' + arguments.callee.name);

	var zipOkay = false;
	Ti.API.info("Output to ZIP file: " + writeToZip);

	var packageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, zipRootDir);
	if (! packageDir.exists()) {
		packageDir.createDirectory();
	}

	var a_txt = Ti.Filesystem.getFile(packageDir.resolve(), 'a.txt');
	Ti.API.debug("a_txt path = " + a_txt.resolve());
	a_txt.write("This is the a.txt file....", false);

	var b_txt = Ti.Filesystem.getFile(packageDir.resolve(), 'b.txt');
	Ti.API.debug("b_txt path = " + b_txt.resolve());
	b_txt.write("This is the b.txt file....", false);

	var result = '';

	if (OS_IOS) {
		result = Compression.zip(writeToZip, zipRootDir, password, [a_txt.resolve(), b_txt.resolve()]);
	}
	if (OS_ANDROID) {
		result = Compression.zip(writeToZip, zipRootDir, password, [a_txt.name, b_txt.name]);
	}

	if (result == 'success') {
		if (!Ti.Filesystem.getFile(writeToZip).exists()) {
			Ti.API.error('FAIL: The target zip does not exist!');
		} else {
			Ti.API.info('Zip Files: ' + result + ', to: ' + writeToZip);
		}
		zipOkay = true;
	} else {
		Ti.API.error("Error creating archive: " + result);
	}

	packageDir = null;
	a_txt = null;
	b_txt = null;

	return zipOkay;
}

function sendMessage() {
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "[BetOnThisNV - NV SelfCare] Get Help";
	// TODO change this
	emailDialog.toRecipients = ['bdhansen@health.nv.gov'];
	emailDialog.messageBody = 'Name: ' + $.name.value + '<br/>Phone #:' + $.phone.value + '<br/>Message:' + $.message.value;

	var writeToZip = outputDirectory + '/nvsexsafe_package.zip';

	if (createArchive(writeToZip)) {
		if (OS_ANDROID) {
			var f = Ti.Filesystem.getFile(writeToZip);
			var copyFileName = Ti.Filesystem.tempDirectory + '/nvsexsafe_package.zip';
			if (f.copy(copyFileName)) {
				var fCopy = Ti.Filesystem.getFile(writeToZip);
				emailDialog.addAttachment(fCopy);
				emailDialog.open();
			} else {
				alert("Unable create data archive for SelfCare. Unable to send message.");
				Ti.API.error("Copy of attachment file failed: " + copyFileName);
			}

		} else if (OS_IOS) {
			emailDialog.addAttachment(Ti.Filesystem.getFile(writeToZip));
			emailDialog.open();
		}
	} else {
		alert("Unable create data archive for SelfCare. Unable to send message.");
	}

}

function send(e) {
	Ti.API.trace('journal.' + arguments.callee.name + ": " + JSON.stringify(e));

	var title = 'Enter Password';
	var labelText = 'Enter a password to protect your data.\n  You will give to the case worker using a different method of communication.\n  A strong password is 8 to 16 characters with at least one capital letter, number and special character.';
	if (OS_ANDROID) {
		var inputView = Titanium.UI.createView({
			backgroundColor : '#111',
			layout : 'vertical'
		});

		var label = Titanium.UI.createLabel({
			font : {
				fontSize : '26dp',
				fontFamily : 'Helvetica Neue'
			},
			top : 10,
			width : '80%',
			text : labelText
		});

		var passwordField = Titanium.UI.createTextField({
			font : {
				fontSize : '26dp',
				fontFamily : 'Helvetica Neue'
			},
			top : 10,
			width : '50%',
			passwordMask : true,
			hintText : 'enter a password',
			returnKeyType : Ti.UI.RETURNKEY_DONE
		});

		inputView.add(label);
		inputView.add(passwordField);
		var dialog = Titanium.UI.createAlertDialog({
			androidView : inputView,
			buttonNames : ['OK', 'Cancel'],
			title : title
		});

	}
	if (OS_IOS) {
		var dialog = Titanium.UI.createAlertDialog({
			androidView : inputView,
			buttonNames : ['OK', 'Cancel'],
			title : title,
			message : labelText,
			style : Titanium.UI.iPhone.AlertDialogStyle.SECURE_TEXT_INPUT,
			persistent : true
		});

	}
	dialog.addEventListener('click', function(e) {
		Titanium.API.info("Dialog Click : " + JSON.stringify(e));
		if (e.button == true && e.index == 0) {
			if (!val || val.length == 0) {

			} else {
				password = passwordField.value;
				sendMessage();
			}
		}
	});

	dialog.show();

}

function open() {
	Ti.API.debug('journal.' + arguments.callee.name);
	loadData();
}
