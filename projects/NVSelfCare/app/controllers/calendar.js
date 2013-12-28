var moment = require('alloy/moment');

var currentMonth = moment();

function updateCalendarHeading(current) {
	Ti.API.debug('calendar.' + arguments.callee.name);
	var monthYearSelected = current.format("MMMM YYYY");
	Ti.API.info(monthYearSelected);
	$.calendarHeading.text = monthYearSelected;
}

function doPrevMonth() {
	Ti.API.debug('calendar.' + arguments.callee.name);
	var widget;

	// Remove current month calendar.
	$.calendarView.remove($.calendarView.children[0]);

	// Create previous month calendar and add view
	currentMonth.subtract('months', 1);
	widget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth
	});
	$.calendarView.add(widget.getView());

	// Get calendar displayed (moment object)
	// Ti.API.info(widget.calendarMonth());
	updateCalendarHeading(currentMonth);
}

function doNextMonth() {
	Ti.API.debug('calendar.' + arguments.callee.name);
	var widget;
	$.calendarView.remove($.calendarView.children[0]);

	// Create next month calendar and add view
	currentMonth.add('months', 1);
	widget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth
	});
	$.calendarView.add(widget.getView());

	// Ti.API.info(widget.calendarMonth());
	updateCalendarHeading(currentMonth);
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
			if(activity.invalidateOptionsMenu != undefined) {
				activity.invalidateOptionsMenu();
			}
			activity.onCreateOptionsMenu = function(e) {
				var menu = e.menu;
				var menuItem1 = menu.add({
					// title: 'Bet On This',
					titleCondensed : 'Bet On This',
					icon : 'images/BetOnThisIcon.png',
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});
				menuItem1.addEventListener('click', openWebView);
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

}

