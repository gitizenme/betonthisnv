var moment = require('alloy/moment');
var animation = require('alloy/animation');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

var searchBar;

function journalChanged(context) {
	Ti.API.debug('journal.' + arguments.callee.name + ': ' + JSON.stringify(context));
	loadData();
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

function ConvertToCSV(objArray) {
	Ti.API.trace('journal.' + arguments.callee.name);
	var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	var str = '';

	for (var i = 0; i < array.length; i++) {
		var line = '';
		for (var index in array[i]) {
			if (line != '')
				line += ',';
			line += '"';
			line += array[i][index];
			line += '"';
		}

		str += line + '\r\n';
	}

	return str;
}


function send(e) {
	Ti.API.trace('journal.' + arguments.callee.name + ": " + JSON.stringify(e));

	var zipRootDir = 'package';

	var packageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, zipRootDir);
	if (! packageDir.exists()) {
		packageDir.createDirectory();
	}

	var filesToSend = [];

	var fileName = "NV_SexSafe_Journal_" + moment().format("MMDDYYYY-hhmm-A");
	var journalFile = Ti.Filesystem.getFile(packageDir.resolve(), fileName + ".csv");

	var keys = ['sortDate', 'displayData'];
	var journalData = journal.map(function(entry) {
		var mapped = {};

		for (var i = 0, j = keys.length; i < j; i++) {
			mapped[keys[i]] = entry.attributes[keys[i]];
		};
		mapped["type"] = types.activityTypes[entry.attributes.section][entry.attributes.type].type;

		return mapped;
	});

	var journalCSV = '"Date", "Data", "Type"\r\n' +  ConvertToCSV(JSON.stringify(journalData));
	journalFile.write(journalCSV, false);

	if (OS_IOS) {
		filesToSend.push(journalFile.resolve());
	}
	if (OS_ANDROID) {
		filesToSend.push(journalFile.name);
	}

	var args = {
		outputDirectory : Ti.Filesystem.applicationDataDirectory + '/',
		tempDirectory : Ti.Filesystem.tempDirectory + '/',
		zipRootDir : zipRootDir,
		zipFileName : fileName + '.zip',
		title : 'SEND\nJOURNAL',
		sendInfo : 'Please enter a password to create a password protected file that contains your Journal information.\nWrite this password down and communicate it to your case manager using a separate messge.\nThis file will be encrypted and sent via the e-mail app on your device.',
		sendFileList : filesToSend
	};

	var sendMessageController = Alloy.createController('SendEncryptedMessage', args);

	if(OS_IOS) {
		sendMessageController.getView().open();
	}

	packageDir = null;

}

function open() {
	Ti.API.debug('journal.' + arguments.callee.name);
	loadData();
}
