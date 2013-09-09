var moment = require('alloy/moment');


var col1Stop, col2Stop, col3Stop = 0;
var col1Idx, col2Idx, col3Idx = 4;
var numberOfSpins = 15;
var spinDurationSeconds = 5;
var spinCycleDelay = 10;

function sleep(milliseconds) {
    var start = new Date().getTime();
 
    while((new Date().getTime() - start) < milliseconds) {
        // Do nothing
    }
}
 
function initReels() {
	col1Idx = $.column1.rowCount-10;
	col2Idx = $.column2.rowCount-10;
	col3Idx = $.column2.rowCount-10;
	$.picker.setSelectedRow(0, col1Idx, false);
	$.picker.setSelectedRow(1, col2Idx, false);
	$.picker.setSelectedRow(2, col3Idx, false);
}

function spinClicked(e) {

	Ti.API.info("START Spinning!");

	initReels();
	
	var spinDuration = moment().add('s', spinDurationSeconds);
	while (moment().isBefore(spinDuration)) {

		Ti.API.info("CONTINUE Spinning!");
		for (var n = 0; n < numberOfSpins; n++) {

			col1Idx--;
			col2Idx--;
			col3Idx--;
			if(col1Idx <= 0) {
				col1Idx =  $.column1.rowCount-10;
				$.picker.setSelectedRow(0, col1Idx, false);
			}
			else {
				$.picker.setSelectedRow(0, col1Idx, true);
			}
			if(col2Idx <= 0) {
				col2Idx =  $.column2.rowCount-10;
				$.picker.setSelectedRow(1, col2Idx, false);
			}
			else {
				$.picker.setSelectedRow(1, col2Idx, true);
			}
			if(col3Idx <= 0) {
				col3Idx =  $.column3.rowCount-10;
				$.picker.setSelectedRow(2, col3Idx, false);
			}
			else {
				$.picker.setSelectedRow(2, col3Idx, true);
			}
			sleep(spinCycleDelay);
		}
	}

	Ti.API.info("STOP Spinning!");
	col1Stop = Math.floor((Math.random() * col1Idx)+4);
	col2Stop = Math.floor((Math.random() * col2Idx)+4);
	col3Stop = Math.floor((Math.random() * col3Idx)+4);
	sleep(100);
	$.picker.setSelectedRow(0, col1Stop, true);
	sleep(125);
	$.picker.setSelectedRow(1, col2Stop, true);
	sleep(150);
	$.picker.setSelectedRow(2, col3Stop, true);

}

function open() {
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	$.picker.width = screenWidth-40;
	$.picker.left = 0;
	initReels();	
}

exports.init = function (args) {
	open();
}

//$.index.open();
