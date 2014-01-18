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

	var rowProps = {
		backgroundColor : "#5AAFB5",
		selectedBackgroundColor : "#6CD1D7",
		accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
		modelId : -1,
		searchableText : ''
	};

	var journalSortedByDate = journal.sortBy(function(model) {
		return moment(model.attributes.sortDate, "YYYY/MM/DD").toDate();
	});

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

			rowProps.modelId = entry.journal_id;

			var image = types.listViewImages[entry.section][entry.type];
			if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_MOOD) {
				image = types.moodImages[parseInt(entry.data)];
			} else if (entry.section == types.SECTION_HEALTH && entry.type == types.SECTION_HEALTH_FATIGUE) {
				image = types.fatigueImages[parseInt(entry.data)];
			}

			rowProps.searchableText = moment(key).calendar() + " " + entry.displayData;

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

var temp = {
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

var XXXproperties = {
	"subinfo" : {
		"text" : "Updated 2 hours ago"
	},
	"pic" : {
		"image" : "/images/CommentIcon.png"
	},
	"info" : {
		"text" : "Hi\n"
	},
	"properties" : {
		"modelId" : 16,
		"backgroundColor" : "#5AAFB5",
		"searchableText" : "1386576000000 Dr. Appt:1/18/2014 8:45 PM",
		"selectedBackgroundColor" : "#6CD1D7",
		"accessoryType" : 0
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

	var itemForSection = $.journalListView.sections[e.sectionIndex].items[e.itemIndex];
	Ti.API.debug("journal: itemForSection.properties = " + JSON.stringify(itemForSection));

}

function open() {
	Ti.API.debug('journal.' + arguments.callee.name);
	loadData();
}
