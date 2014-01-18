var moment = require('alloy/moment');
var animation = require('alloy/animation');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

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

			rowProps.searchableText = moment(entry.sortDate) + " " + entry.displayData;

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

	var search = Titanium.UI.createSearchBar({
		barColor : '#000',
		showCancel : true,
		height : 43,
		top : 0,
	});
	search.addEventListener('cancel', function() {
		search.blur();
	});

	search.addEventListener('change', function(e) {
		$.journalListView.searchText = e.value;
	});
	$.journalListView.headerView = search;

	// $.journalListView.searchView = search;

}

function open() {
	Ti.API.debug('journal.' + arguments.callee.name);
	loadData();
}
