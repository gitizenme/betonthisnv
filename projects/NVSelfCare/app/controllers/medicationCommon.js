

var moment = require('alloy/moment');

var currentTime = moment().startOf('hour').add('h', 1);

var timeFormat = "M/D/YYYY h:mm A";

$.dateTimeField.value = currentTime.format(timeFormat);

var dateSliderValue = $.dateSlider.value;
var timeSliderValue = $.timeSlider.value;

function updateDate(e) {
	Ti.API.debug('drAppointmentCommon.' + arguments.callee.name + ': ' + JSON.stringify(e));
	if($.dateSlider.value >= dateSliderValue) {
		currentTime.add('d', 1);
	}
	else {
		currentTime.subtract('d', 1);
	}
	timeSliderValue = dateSliderValue.value;
	$.dateTimeField.value = currentTime.format(timeFormat);
}

function updateTime(e) {
	Ti.API.debug('drAppointmentCommon.' + arguments.callee.name + ': ' + JSON.stringify(e));
	if($.timeSlider.value >= timeSliderValue) {
		currentTime.add('m', 15);
	}
	else {
		currentTime.subtract('m', 15);
	}
	timeSliderValue = $.timeSlider.value;

	$.dateTimeField.value = currentTime.format(timeFormat);
}

function dateTimeFieldChanged(e) {
	Ti.API.debug('drAppointmentCommon.' + arguments.callee.name + ': ' + JSON.stringify(e));
	var newDateTime = e.value;
	
	if(!moment(newDateTime).isValid()) {
		$.dateTimeField.borderColor = 'red';
		$.dateTimeField.color = 'red';
	}
	else {
		$.dateTimeField.borderColor = 'green';
		$.dateTimeField.color = 'white';
	}
	 
}
