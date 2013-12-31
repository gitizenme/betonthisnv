/**
 * @author Joe Chavez
 */

function CalendarUtils() {
	var _calendarAccessAuthorized = false;
	var _event = null;

	var _authorizeCalendarAccess = function(callback) {
		Ti.API.debug('calendarUtil.' + arguments.callee.name);

		if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
			_calendarAccessAuthorized = true;
			callback();
		} else {
			Ti.Calendar.requestEventsAuthorization(function(e) {
				Ti.API.debug('calendarUtil.requestEventsAuthorization: ' + JSON.stringify(e));
				if (e.success) {
					_calendarAccessAuthorized = true;
					callback();
				} else {
					_calendarAccessAuthorized = false;
					callback();
				}
			});
		}
	};

	var _authorizeCalendar = function() {
		Ti.API.debug('calendarUtil.' + arguments.callee.name);
		if (OS_ANDROID) {
			_calendarAccessAuthorized = true;
			return true;
		}
		if (OS_IOS) {
			if (_calendarAccessAuthorized) {
				return _calendarAccessAuthorized;
			}
			_authorizeCalendarAccess(function(authorized) {
				return _calendarAccessAuthorized;
			});
		}
	};

	var _addToCalendar = function(details, callback) {
		Ti.API.debug('calendarUtil.' + arguments.callee.name);
		var calendars = [];
		var selectedCalendarName;
		var selectedid;
		var pickerData = [];
		var calendar;

		var win = Ti.UI.createWindow({
			backgroundColor : '#2399A3',
			exitOnClose : false,
			fullscreen : false,
			layout : 'vertical',
			height : Ti.UI.FILL,
			modal : true,
			title : 'Select Calendar'
		});

		//**read events from calendar*******
		function performCalendarReadFunctions() {

			var label = Ti.UI.createLabel({
				backgroundColor : 'white',
				text : 'Add Calendar Event\nPick a calendar to add this event to:',
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				backgroundColor : '#2399A3',
				top : 80,
				width : Ti.UI.FILL
			});
			win.add(label);

			var selectableCalendars = Ti.Calendar.allCalendars;
			for (var i = 0, ilen = selectableCalendars.length; i < ilen; i++) {
				calendars.push({
					name : selectableCalendars[i].name,
					id : selectableCalendars[i].id
				});
				pickerData.push(Ti.UI.createPickerRow({
					title : calendars[i].name
				}));
				if (i === 0) {
					selectedCalendarName = selectableCalendars[i].name;
					selectedid = selectableCalendars[i].id;
				}
			}

			if (!calendars.length) {
				label.text = 'No calendars available. Select at least one in the native calendar before using this app';
			} else {
				label.text = 'Pick a calendar to add this event to';
				calendar = calendars[0];
				var picker = Ti.UI.createPicker({
					backgroundColor : '#fff',
					top : 20
				});

				picker.add(pickerData);
				win.add(picker);

				picker.addEventListener('change', function(e) {
					for (var i = 0, ilen = calendars.length; i < ilen; i++) {
						if (calendars[i].name === e.row.title) {
							selectedCalendarName = calendars[i].name;
							selectedid = calendars[i].id;
							Ti.API.info('Selected calendar that we are going to fetch is :: ' + selectedid + ' name:' + selectedCalendarName);
							calendar = calendars[i];
						}
					}
				});

			}

			var button = Ti.UI.createButton({
				title : 'Select',
				color: '#000',
				left: 20,
				top : 20
			});

			button.addEventListener('click', function(e) {
				if (calendar) {
					var nativeCalendar = null;
					if (OS_ANDROID) {
						nativeCalendar = Ti.Calendar.getCalendarById(calendar.id);
					}
					if (OS_IOS) {
						nativeCalendar = Ti.Calendar.allCalendars[0];
						// nativeCalendar = Ti.Calendar.getDefaultCalendar();
					}
					if (nativeCalendar) {
						_event = nativeCalendar.createEvent(details);
						if (OS_IOS) {
							_event.save();
						}
						Ti.API.info("Created event, id: " + _event.id + ", title: " + _event.title);
						Ti.App.fireEvent("app:calendarEventCreated", {
							event : _event
						});
					}
				} else {
					alert('Unable to create the event. Please select a valid calendar');
				}
				win.close();
			});

			var cancelButton = Ti.UI.createButton({
				title : 'Cancel',
				color : '#E81C24',
				left : 20,
				top : 20
			});
			cancelButton.addEventListener('click', function(e) {
				win.close();
			});

			var view = Ti.UI.createView({
				backgroundColor : '#2399A3',
				height : Ti.UI.SIZE,
				horizontalWrap: false,
				layout : 'horizontal'
			});

			view.add(button);
			view.add(cancelButton);

			win.add(view);

		}

		performCalendarReadFunctions();

		win.open();
	};

	var _createEvent = function(details, callback) {
		_addToCalendar(details, callback);
	};

	this.isCalendarAccessAuthorized = function() {
		Ti.API.debug('calendarUtil.' + arguments.callee.name);
		return _authorizeCalendar();
	};

	this.addEventToCalendar = function(eventDetails) {
		Ti.API.debug('calendarUtil.' + arguments.callee.name + ': ' + JSON.stringify(eventDetails));
		var event = null;
		_authorizeCalendar();
		if (_calendarAccessAuthorized) {
			_createEvent(eventDetails, function(selectedEvent) {
				return selectedEvent;
			});
		} else {
			alert('Unable to add this event to your calendar. Please give NV SelfCare permission to access your calendar.');
		}
		return event;

	};

}

module.exports = CalendarUtils;
