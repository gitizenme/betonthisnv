var moment = require('alloy/moment');


var args = {
	title : "SELF CARE"
};

var currentMonth = moment();

function updateCalendarHeading(current) {
    var monthYearSelected = current.format("MMMM YYYY");
    Ti.API.info(monthYearSelected);
    $.calendarHeading.text = monthYearSelected;
}


function doPrevMonth() {
    var widget;

    // Remove current month calendar.
    $.calendar.remove($.calendar.children[0]);

    // Create previous month calendar and add view
    currentMonth.subtract('months', 1);
    widget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
        period : currentMonth
    });
    $.calendar.add(widget.getView());

    // Get calendar displayed (moment object)
    // Ti.API.info(widget.calendarMonth());
    updateCalendarHeading(currentMonth);
}

function doNextMonth() {
    var widget;
    $.calendar.remove($.calendar.children[0]);

    // Create next month calendar and add view
    currentMonth.add('months', 1);
    widget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
        period : currentMonth
    });
    $.calendar.add(widget.getView());

    // Ti.API.info(widget.calendarMonth());
    updateCalendarHeading(currentMonth);
}

// You can select tile
// $.current.select(currentMonth.date());
$.current.setDate(currentMonth.date());

$.calendarHeading.text = currentMonth.format("MMMM YYYY");

// You can add image
// $.current.setImage(16, 'images/airplane.png');

// To handle the click event, set the listener to the parent View.
$.calendar.addEventListener('click', function(e) {
    // You can get selectedDate. (moment object)
    var selectedDate = $.current.selectedDate();

	var args = {
		day: selectedDate
	};

	var dayViewController = Alloy.createController('day_view', args);

	if(OS_IOS) {
		dayViewController.getView().open();
	}
});


$.calendarWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.calendarWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.calendarWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();


function init() {
	Ti.API.trace('calendar.' + arguments.callee.name);

}

function openWebView() {
	var args = {
	};

	var controller = Alloy.createController('BetOnThisNVWebView', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

// Android
if(OS_ANDROID) {
    $.calendarTab.addEventListener('focus', function() {
        if($.calendarTab.tabGroup.activity) {
            var activity = $.calendarTab.tabGroup.activity;
             
            // Menu
            activity.invalidateOptionsMenu();
            activity.onCreateOptionsMenu = function(e) {
                var menu = e.menu;
                var menuItem1 = menu.add({
                    // title: 'Bet On This',
                    titleCondensed: 'Bet On This',
                    icon : 'images/BetOnThisIcon.png',
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
                });
                menuItem1.addEventListener('click', openWebView);
            };
             
            // Action Bar
            if( Alloy.Globals.Android.Api >= 11 && activity.actionBar != null) {      
                activity.actionBar.title = 'NV SexSafe';
            }            
        }   
    });
}
 


function open() {

	init();

}
