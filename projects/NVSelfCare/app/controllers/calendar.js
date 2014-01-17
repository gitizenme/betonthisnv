var animation = require('alloy/animation');
var moment = require('alloy/moment');
var types = require('types');

var journal = Alloy.Collections.journal;
journal.fetch();

var currentMonth = moment();

function updateCalendarIconForActivity(entry) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(entry));
	var selectedDate = moment(entry.sortDate, "MM/DD/YYYY");
	if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_COMMENT) {
		$.current.setImage(selectedDate, '/images/CommentIconSmall.png', 1, 1);
	}
	if (entry.section == types.SECTION_ACTIVITY && entry.type == types.SECTION_ACTIVITY_HAD_SEX) {
		$.current.setImage(selectedDate, '/images/SexIconSmall.png', 1, 2);
	}
	if (entry.section == types.SECTION_DIARY && entry.type == types.SECTION_DIARY_MOOD) {
		$.current.setImage(selectedDate, types.moodImagesSmall[parseInt(entry.data)], 1, 3);
	}
	if (entry.section == types.SECTION_ALERTS && entry.type == types.SECTION_ALERTS_DR_APPT) {
		$.current.setImage(selectedDate, '/images/DrAppointmentIconSmall.png', 2, 1);
	}
	if (entry.section == types.SECTION_HEALTH && entry.type == types.SECTION_HEALTH_TCELL) {
		$.current.setImage(selectedDate, '/images/TCellIconSmall.png', 2, 2);
	}
	if (entry.section == types.SECTION_ACTIVITY && entry.type == types.SECTION_ACTIVITY_ALCOHOL_TOBACCO) {
		$.current.setImage(selectedDate, '/images/AlcoholTobaccoIconSmall.png', 2, 3);
	}
}

function loadModelIntoCalendar() {
	Ti.API.debug('calendar.' + arguments.callee.name);
	journal.fetch();

	// TODO clear calendar if no data

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

function animateCalendarMonthChange(current) {
	Ti.API.debug('calendar.' + arguments.callee.name);

	// $.current.getView().hide();
	// $.current.getView().show();

	animation.fadeOut($.calendarView, 150, function() {
		$.calendarView.remove($.calendarView.children[0]);
		$.calendarView.add($.current.getView());
		animation.fadeIn($.calendarView, 150);
	});

	var monthYearSelected = current.format("MMMM YYYY");
	Ti.API.info(monthYearSelected);

	animation.fadeOut($.calendarHeading, 125, function() {
		$.calendarHeading.text = monthYearSelected;
		animation.fadeIn($.calendarHeading, 125);
	});

	animation.fadeOut($.prevButtonLabel, 175, function() {
		$.prevButtonLabel.text = moment(current).subtract('M', 1).format('MMM');
		animation.fadeIn($.prevButtonLabel, 175);
	});

	animation.fadeOut($.nextButtonLabel, 175, function() {
		$.nextButtonLabel.text = moment(current).add('M', 1).format('MMM');
		animation.fadeIn($.nextButtonLabel, 175);
	});

}

function doPrevMonth() {
	Ti.API.debug('calendar.' + arguments.callee.name);

	currentMonth.subtract('months', 1);
	$.current = null;
	$.current = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth
	});

	loadModelIntoCalendar();

	animateCalendarMonthChange(currentMonth);

}

function doNextMonth() {
	Ti.API.debug('calendar.' + arguments.callee.name);

	currentMonth.add('months', 1);
	$.current = null;
	$.current = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth
	});

	loadModelIntoCalendar();

	animateCalendarMonthChange(currentMonth);

}

function showDayView() {
	// Alloy.Globals.loader.Open();

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

}

function onClickCalendar(e) {
	showDayView();

}

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

	// You can select tile
	$.current.getView().hide();
	$.current.setDate(currentMonth.date());
	//
	$.calendarHeading.text = currentMonth.format("MMMM YYYY");
	//

	$.prevButtonLabel.text = moment(currentMonth).subtract('M', 1).format('MMM');
	$.nextButtonLabel.text = moment(currentMonth).add('M', 1).format('MMM');

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

function openLoginView() {
	Ti.API.trace('calendar.' + arguments.callee.name);
	var args = {
	};
	Alloy.Globals.AuthenticateOnResume = false;

	var controller = Alloy.createController('Login', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

// Android
if (OS_ANDROID) {

	function configureAndroidMenu() {
		Ti.API.debug('calendar.' + arguments.callee.name);
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

	}

}

var overlayView = Ti.UI.createView({
	backgroundColor : '#2399A3',
	width : Ti.UI.FILL,
	height : Ti.UI.FILL
});

function open() {
	Ti.API.debug('calendar.' + arguments.callee.name);

	init();
	setTimeout(loadModelIntoCalendar, 750);
	if (OS_ANDROID) {
		configureAndroidMenu();
		$.calendarTab.tabGroup.activity.addEventListener('stop', stopActivityAndroid);
		$.calendarTab.tabGroup.activity.addEventListener('restart', restartActivityAndroid);
		$.calendarTab.tabGroup.activity.addEventListener('pause', pauseActivityAndroid);
		$.calendarTab.tabGroup.activity.addEventListener('resume', resumeActivityAndroid);
	}

	$.current.getView().show();

}



function onTabBlur(e) {
	Ti.API.debug('calendar.' + arguments.callee.name);
}

function onTabFocus(e) {
	Ti.API.debug('calendar.' + arguments.callee.name);
}

function appResumed(e) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
	$.current.getView().show();
}

function appResume(e) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
}

function appPause(e) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
	$.current.getView().hide();
}

function appPaused(e) {
	Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
}

if (OS_ANDROID) {

	function restartActivityAndroid(e) {
		Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function pauseActivityAndroid(e) {
		Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
		// $.current.getView().hide();
		// $.calendarView.add(overlayView);
	}

	function resumeActivityAndroid(e) {
		Ti.API.debug('calendar.' + arguments.callee.name + ': ' + JSON.stringify(e));
		// $.current.getView().show();
		// $.calendarView.remove(overlayView);
	}

}

if (OS_IOS) {

	Ti.App.addEventListener('resumed', appResumed);
	Ti.App.addEventListener('resume', appResume);
	Ti.App.addEventListener('pause', appPause);
	Ti.App.addEventListener('paused', appPaused);

}

