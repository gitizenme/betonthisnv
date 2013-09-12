var moment = require('alloy/moment');
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
$.current.select(currentMonth.date());

$.calendarHeading.text = currentMonth.format("MMM YYYY");

// You can add image
// $.current.setImage(16, 'images/airplane.png');

// To handle the click event, set the listener to the parent View.
$.calendar.addEventListener('click', function(e) {
    // You can get selectedDate. (moment object)
    var selectedDate = $.current.selectedDate();
    
});

