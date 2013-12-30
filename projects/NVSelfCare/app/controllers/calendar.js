var moment = require('alloy/moment');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

var currentMonth = moment();

function updateCalendarIconForActivity(entry) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(entry));
	if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_COMMENT) {
		var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
		$.current.setImage(selectedDate, '/images/CommentIconSmall.png', 1, 1);
	}
	if (entry.section == types.SECTION_ACTIVITY && entry.type == types.SECTION_ACTIVITY_HAD_SEX) {
		var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
		$.current.setImage(selectedDate, '/images/SexIconSmall.png', 1, 2);
	}
	if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_MOOD) {
		var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
		$.current.setImage(selectedDate, types.moodImagesSmall[parseInt(entry.data)], 1, 3);
	}
	if (entry.section == types.SECTION_ALERTS && entry.type == types.SECTION_ALERTS_MEDICATION) {
		var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
		$.current.setImage(selectedDate, '/images/MedicationIconSmall.png', 2, 1);
	}
	if (entry.section == types.SECTION_HEALTH && entry.type == types.SECTION_HEALTH_TCELL) {
		var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
		$.current.setImage(selectedDate, '/images/TCellIconSmall.png', 2, 2);
	}
	if (entry.section == types.SECTION_ACTIVITY && entry.type == types.SECTION_ACTIVITY_ALCOHOL_TOBACCO) {
		var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
		$.current.setImage(selectedDate, '/images/AlcoholTobaccoIconSmall.png', 2, 3);
	}
}

function loadModelIntoCalendar() {
	Ti.API.debug('day_view.' + arguments.callee.name);
	journal.fetch();

	var existingJournalModel = journal.filter(function(entry) {
		var sortDate = moment(entry.attributes.sortDate, "MM/DD/YYYY");
		var sortDateMonth = sortDate.month();
		var sortDateYear = sortDate.year();
		var calendarViewMonth = currentMonth.month();
		var calendarViewYear = currentMonth.year();

		if (sortDateMonth == calendarViewMonth && sortDateYear == calendarViewYear) {
			return entry;
		}
	});

	for (var i = 0, j = existingJournalModel.length; i < j; i++) {
		var entry = existingJournalModel[i];
		updateCalendarIconForActivity(entry.attributes);
	};

}

function journalChanged(context) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(context));
	updateCalendarIconForActivity(context.attributes);
}

journal.on('change', journalChanged);

function updateCalendarHeading(current) {
	Ti.API.debug('calendar.' + arguments.callee.name);
	var monthYearSelected = current.format("MMMM YYYY");
	Ti.API.info(monthYearSelected);
	$.calendarHeading.text = monthYearSelected;
}

function doPrevMonth() {
	Ti.API.debug('calendar.' + arguments.callee.name);

	// Remove current month calendar.
	$.calendarView.remove($.calendarView.children[0]);

	// Create previous month calendar and add view
	currentMonth.subtract('months', 1);
	$.current = null;
	$.current = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth
	});
	$.calendarView.add($.current.getView());

	updateCalendarHeading(currentMonth);
	loadModelIntoCalendar();
}

function doNextMonth() {
	Ti.API.debug('calendar.' + arguments.callee.name);

	$.calendarView.remove($.calendarView.children[0]);

	// Create next month calendar and add view
	currentMonth.add('months', 1);
	$.current = null;
	$.current = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth
	});
	$.calendarView.add($.current.getView());

	updateCalendarHeading(currentMonth);
	loadModelIntoCalendar();
}

// You can select tile
$.current.setDate(currentMonth.date());

$.calendarHeading.text = currentMonth.format("MMMM YYYY");

// You can add image
// $.current.setImage(16, 'images/airplane.png');

// To handle the click event, set the listener to the parent View.
$.calendarView.addEventListener('click', function(e) {
	// You can get selectedDate. (moment object)
	var selectedDate = $.current.selectedDate();

	Alloy.Globals.AuthenticateOnResume = false;
	var args = {
		day : selectedDate
	};

	var dayViewController = Alloy.createController('day_view', args);

	if (OS_IOS) {
		dayViewController.getView().open();
	}
});

if (OS_IOS) {
	var args = {
		title : "SELF CARE"
	};
	$.tabWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

	$.tabWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
	$.tabWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();
}

function init() {
	Ti.API.debug('calendar.' + arguments.callee.name);

}

function openWebView() {
	Ti.API.debug('calendar.' + arguments.callee.name);
	var args = {
	};
	Alloy.Globals.AuthenticateOnResume = false;

	var controller = Alloy.createController('BetOnThisNVWebView', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

function openAboutView() {
	Ti.API.trace('calendar.' + arguments.callee.name);
	var args = {
	};
	Alloy.Globals.AuthenticateOnResume = false;

	var controller = Alloy.createController('About', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

// Android
if (OS_ANDROID) {
	$.calendarTab.addEventListener('focus', function() {
		Ti.API.debug('calendar.focus' + arguments.callee.name);
		if ($.calendarTab.tabGroup.activity) {
			var activity = $.calendarTab.tabGroup.activity;

			// Menu
			if (activity.invalidateOptionsMenu != undefined) {
				activity.invalidateOptionsMenu();
			}
			activity.onCreateOptionsMenu = function(e) {
				var menu = e.menu;
				var menuItem1 = menu.add({
					titleCondensed : 'Bet On This',
					icon : '/images/BetOnThisIcon.png',
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});
				menuItem1.addEventListener('click', openWebView);
				if (Alloy.Globals.Android.Api < 11 && activity.actionBar == null) {
					var menuItem2 = menu.add({
						titleCondensed : 'About',
						icon : '/images/appicon-Small-40.png',
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
					});
					menuItem2.addEventListener('click', openAboutView);
				}

			};

			// Action Bar
			if (Alloy.Globals.Android.Api >= 11 && activity.actionBar != null) {
				activity.actionBar.title = 'NV SelfCare';
				activity.actionBar.onHomeIconItemSelected = openAboutView;
			}

		}

	});
}

function open() {
	Ti.API.debug('calendar.' + arguments.callee.name);

	init();
	loadModelIntoCalendar();

}

