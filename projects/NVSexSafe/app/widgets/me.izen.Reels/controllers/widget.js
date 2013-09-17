var moment = require('alloy/moment');

var gender = ['M', 'F', 'M2F', 'F2M', 'TS/TV'];

var cards = ['10', 'J', 'Q', 'K', 'A'];

var who = ['Me', 'Partner', 'M Mult', 'F Mult', 'Mixed'];

var col1Stop, col2Stop, col3Stop, col4Stop = 0;
var col1Idx, col2Idx, col3Idx, col4Idx = 4;
var col1locked, col2locked, col3locked, col4locked = false;
var numberOfSpins = 15;
var spinDurationSeconds = 5;
var spinCycleDelay = 10;
var lockCount = 0;

function sleep(milliseconds) {
    var start = new Date().getTime();

    while ((new Date().getTime() - start) < milliseconds) {
        // Do nothing
    }
}

/*
 $.picker = Ti.UI.createPicker({
 top : '50 dp'
 });
 $.picker.selectionIndicator = true;
 $.picker.useSpinner = true;

 $.column1 = Ti.UI.createPickerColumn();
 $.column2 = Ti.UI.createPickerColumn();
 $.column3 = Ti.UI.createPickerColumn();
 */

function initReels() {
    Ti.API.trace('reels.' + arguments.callee.name);

    /*
     for (var i = 0; i < 100; i++) {
     for (var j = 0; j < 5; j++) {
     var row1 = Ti.UI.createPickerRow({
     title : gender[j]
     });
     $.column1.addRow(row1);
     var row2 = Ti.UI.createPickerRow({
     title : cards[j]
     });
     $.column2.addRow(row2);
     var row3 = Ti.UI.createPickerRow({
     title : who[j]
     });
     $.column3.addRow(row3);
     }
     };

     $.picker.add([$.colunm1, $.column2, $.column3]);
     $.reels.add($.picker);
     */
    lockCount = 0;
    if (!col1locked) {
        col1Idx = $.column1.rowCount - 10;
        $.picker.setSelectedRow(0, col1Idx, false);
        lockCount++;
    }

    if (!col2locked) {
        col2Idx = $.column2.rowCount - 11;
        $.picker.setSelectedRow(1, col2Idx, false);
        lockCount++;
    }

    if (!col3locked) {
        col3Idx = $.column3.rowCount - 10;
        $.picker.setSelectedRow(2, col3Idx, false);
        lockCount++;
    }

    if (!col4locked) {
        col4Idx = $.column4.rowCount - 10;
        $.picker.setSelectedRow(3, col4Idx, false);
        lockCount++;
    }
}

function lockClicked(e) {
    Ti.API.trace('reels.' + arguments.callee.name + ', e=' + JSON.stringify(e));
    if (e.source == $.lock1) {
        col1locked = !col1locked;
        if (col1locked == true) {
            $.lock1.image = '/images/lock.png';
        }
        else {
            $.lock1.image = '/images/unlock.png';
        }
    }
    if (e.source == $.lock2) {
        col2locked = !col2locked;
        if (col2locked == true) {
            $.lock2.image = '/images/lock.png';
        }
        else {
            $.lock2.image = '/images/unlock.png';
        }
    }
    if (e.source == $.lock3) {
        col3locked = !col3locked;
        if (col3locked == true) {
            $.lock3.image = '/images/lock.png';
        }
        else {
            $.lock3.image = '/images/unlock.png';
        }
    }
    if (e.source == $.lock4) {
        col4locked = !col4locked;
        if (col4locked == true) {
            $.lock4.image = '/images/lock.png';
        }
        else {
            $.lock4.image = '/images/unlock.png';
        }
    }
}

function spinClicked(e) {
    Ti.API.trace('reels.' + arguments.callee.name + ', e=' + JSON.stringify(e));

	if(col1locked && col2locked && col3locked && col4locked) {
		// TODO handle the stops
		return;
	}

    $.spin.enabled = false;
    $.lock1.enabled = false;
    $.lock2.enabled = false;
    $.lock3.enabled = false;
    $.lock4.enabled = false;
    initReels();

	if(lockCount == 1) {
		spinCycleDelay = 100;
	}

    var spinDuration = moment().add('s', spinDurationSeconds);
    while (moment().isBefore(spinDuration)) {

        Ti.API.info("CONTINUE Spinning!");
        for (var n = 0; n < numberOfSpins; n++) {

            if (!col1locked) {
                col1Idx--;
                if (col1Idx <= 0) {
                    col1Idx = $.column1.rowCount - 10;
                    $.picker.setSelectedRow(0, col1Idx, false);
                }
                else {
                    $.picker.setSelectedRow(0, col1Idx, true);
                }
            }

            if (!col2locked) {
                col2Idx--;
                if (col2Idx <= 0) {
                    col2Idx = $.column2.rowCount - 11;
                    $.picker.setSelectedRow(1, col2Idx, false);
                }
                else {
                    $.picker.setSelectedRow(1, col2Idx, true);
                }
            }

            if (!col3locked) {
                col3Idx--;
                if (col3Idx <= 0) {
                    col3Idx = $.column3.rowCount - 10;
                    $.picker.setSelectedRow(2, col3Idx, false);
                }
                else {
                    $.picker.setSelectedRow(2, col3Idx, true);
                }
            }

            if (!col4locked) {
                col4Idx--;
                if (col4Idx <= 0) {
                    col4Idx = $.column4.rowCount - 10;
                    $.picker.setSelectedRow(3, col4Idx, false);
                }
                else {
                    $.picker.setSelectedRow(3, col4Idx, true);
                }
            }

            sleep(spinCycleDelay);
        }
    }

    Ti.API.info("STOP Spinning!");
    if (!col1locked) {
        col1Stop = Math.floor((Math.random() * col1Idx) + 4);
    }
    if (!col2locked) {
        col2Stop = Math.floor((Math.random() * col2Idx) + 4);
    }
    if (!col3locked) {
        col3Stop = Math.floor((Math.random() * col3Idx) + 4);
    }
    if (!col4locked) {
        col4Stop = Math.floor((Math.random() * col4Idx) + 4);
    }

    if (!col1locked) {
        sleep(75);
        $.picker.setSelectedRow(0, col1Stop, true);
    }

    if (!col2locked) {
        sleep(100);
        $.picker.setSelectedRow(1, col2Stop, true);
    }

    if (!col3locked) {
        sleep(125);
        $.picker.setSelectedRow(2, col3Stop, true);
    }

    if (!col4locked) {
        sleep(150);
        $.picker.setSelectedRow(3, col4Stop, true);
    }

    $.spin.enabled = true;
    $.lock1.enabled = true;
    $.lock2.enabled = true;
    $.lock3.enabled = true;
    $.lock4.enabled = true;

}

function open() {
    Ti.API.trace('reels.' + arguments.callee.name);


    if (OS_ANDROID) {
        var screenWidth = Ti.Platform.displayCaps.platformWidth;
        $.picker.width = screenWidth;
        $.picker.height = '300';
    }


    initReels();
}

exports.init = function(args) {
    Ti.API.trace('reels.' + arguments.callee.name);
    open();
};

//$.index.open();
