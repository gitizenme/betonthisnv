// require Platino
var platino = require("co.lanica.platino");

/*
 $.sex_shake_web.init($.shakeItWin);
 $.sex_shake_web.on('click', function(e) {
 Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
 var arg = {
 targetPage : 0
 };
 var win1 = Alloy.createController('BetOnThisNVWebView', arg).getView();
 });
 */

var args = {
	title : "Sex Safe"
};
$.shakeItWin.titleControl = Alloy.createController('NavTitleControl', args).getView();

$.shakeItWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.shakeItWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();

// create game view
var game = platino.createGameView();

game.getTiScale = function(x, y) {
	return {
		x : (x / game.touchScaleX),
		y : (y / game.touchScaleY)
	};
};

// create a game scene
var scene = platino.createScene();
scene.color(20.0 / 255.0, 163.0 / 255.0, 178.0 / 255.0);

var touchable = [];

//add your scene to game view
game.pushScene(scene);
/////////////////////////////
// Add transform for the lever
var transform = platino.createTransform();
transform.duration = 1000;
transform.y = 400;

// User is allowed to spin
var canSpin = true;

// Variable for the original Y of the lever
var oY;

// Background
// var bg = platino.createSprite({image:"graphics/bg.png"});
// scene.add(bg);

var topBorder, reel1, reel2, reel3, lever;
var genderUnLockIcon, genderLockIcon, genderLockLabel, isGenderLocked;
var activityUnLockIcon, activityLockIcon, activityLockLabel, isActivityLocked;
var toWhomUnLockIcon, toWhomLockIcon, toWhomLockLabel, isToWhomLocked;

var reels = {
	reel1 : {
		numberOfSprites : 10,
		spriteNames : []
	},
	reel2 : {
		numberOfSprites : 40,
		spriteNames : []
	},
	reel3 : {
		numberOfSprites : 10,
		spriteNames : []
	}
};

function onGenderLockTouch(e) {
	Ti.API.debug("BEGIN - onGenderLockTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on Your Gender sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Your Gender sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Your Gender sprite.');
		if (isGenderLocked) {
			genderLockIcon.alpha = 0;
			genderUnLockIcon.alpha = 1;
			genderLockLabel.color(0, 0, 0);
		} else {
			genderLockIcon.alpha = 1;
			genderUnLockIcon.alpha = 0;
			genderLockLabel.color(1, 1, 1);
		}
		isGenderLocked = !isGenderLocked;
	}

}

function onActivityLockTouch(e) {
	Ti.API.debug("BEGIN - onActivityLockTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on Activity sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Activity sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Activity sprite.');
		if (isActivityLocked) {
			activityLockIcon.alpha = 0;
			activityUnLockIcon.alpha = 1;
			activityLockLabel.color(0, 0, 0);
		} else {
			activityLockIcon.alpha = 1;
			activityUnLockIcon.alpha = 0;
			activityLockLabel.color(1, 1, 1);
		}
		isActivityLocked = !isActivityLocked;
	}

}

function onToWhomIconTouch(e) {
	Ti.API.debug("BEGIN - onToWhomIconTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on To Whom sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on To Whom sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on To Whom sprite.');
		if (isToWhomLocked) {
			toWhomLockIcon.alpha = 0;
			toWhomUnLockIcon.alpha = 1;
			toWhomLockLabel.color(0, 0, 0);
		} else {
			toWhomLockIcon.alpha = 1;
			toWhomUnLockIcon.alpha = 0;
			toWhomLockLabel.color(1, 1, 1);
		}
		isToWhomLocked = !isToWhomLocked;
	}

}

function onLeverTouch(e) {
	Ti.API.debug("BEGIN - onLeverTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on first sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on first sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on first sprite.');
		spin();
	}

}

function initGameScene() {
	Ti.API.debug("BEGIN - initGameScene");

	var suffix = "-hd";

	// if (game.screen.width == 320 || game.screen.width == 480) {//iphone 2G,3G 3GS
	// suffix = "";
	// }

	var scaleFactor = 1;
	if (OS_ANDROID) {
		if (game.size.width == 360) {
			scaleFactor = 1.75;
		} else if (game.size.width == 320) {
			scaleFactor = 2;
		}
	}
	Ti.API.debug("BEGIN - scaleFactor = " + scaleFactor);

	topBorder = platino.createCanvasSprite({
		x : 0,
		y : 0,
		width : game.screen.width,
		height : 13
	});
	topBorder.color(0, 0, 0);
	topBorder.fillRect(0, 0, topBorder.width, topBorder.height);
	scene.add(topBorder);

	genderLockIcon = platino.createSprite({
		image : 'images/lock@2x.png',
		width : 30 / scaleFactor,
		height : 30 / scaleFactor,
		x : 30 / scaleFactor,
		y : 50 / scaleFactor,
		alpha : 0
	});
	scene.add(genderLockIcon);
	touchable.push(genderLockIcon);
	genderLockIcon.addEventListener('touchend', onGenderLockTouch);

	genderUnLockIcon = platino.createSprite({
		image : 'images/unlock@2x.png',
		width : 30 / scaleFactor,
		height : 30 / scaleFactor,
		x : 30 / scaleFactor,
		y : 50 / scaleFactor,
		alpha : 1
	});
	scene.add(genderUnLockIcon);
	touchable.push(genderUnLockIcon);
	genderUnLockIcon.addEventListener('touchend', onGenderLockTouch);
	isGenderLocked = false;

	genderLockLabel = platino.createTextSprite({
		text : 'Your Gender',
		fontSize : 18 / scaleFactor,
		x : 65 / scaleFactor,
		y : 55 / scaleFactor
	});
	genderLockLabel.width += 60;
	scene.add(genderLockLabel);
	touchable.push(genderLockLabel);
	genderLockLabel.addEventListener('touchend', onGenderLockTouch);

	activityLockIcon = platino.createSprite({
		image : 'images/lock@2x.png',
		width : 30 / scaleFactor,
		height : 30 / scaleFactor,
		x : 230 / scaleFactor,
		y : 50 / scaleFactor,
		alpha : 0
	});
	scene.add(activityLockIcon);
	touchable.push(activityLockIcon);
	activityLockIcon.addEventListener('touchend', onActivityLockTouch);
	isActivityLocked = false;

	activityUnLockIcon = platino.createSprite({
		image : 'images/unlock@2x.png',
		width : 30 / scaleFactor,
		height : 30 / scaleFactor,
		x : 230 / scaleFactor,
		y : 50 / scaleFactor,
		alpha : 1
	});
	scene.add(activityUnLockIcon);
	touchable.push(activityUnLockIcon);
	activityUnLockIcon.addEventListener('touchend', onActivityLockTouch);

	activityLockLabel = platino.createTextSprite({
		text : 'Activity',
		fontSize : 18 / scaleFactor,
		x : 266 / scaleFactor,
		y : 55 / scaleFactor
	});
	activityLockLabel.width += 60;
	scene.add(activityLockLabel);
	touchable.push(activityLockLabel);
	activityLockLabel.addEventListener('touchend', onActivityLockTouch);

	toWhomLockIcon = platino.createSprite({
		image : 'images/lock@2x.png',
		width : 30 / scaleFactor,
		height : 30 / scaleFactor,
		x : 430 / scaleFactor,
		y : 50 / scaleFactor,
		alpha : 0
	});
	scene.add(toWhomLockIcon);
	touchable.push(toWhomLockIcon);
	toWhomLockIcon.addEventListener('touchend', onToWhomIconTouch);

	toWhomUnLockIcon = platino.createSprite({
		image : 'images/unlock@2x.png',
		width : 30 / scaleFactor,
		height : 30 / scaleFactor,
		x : 430 / scaleFactor,
		y : 50 / scaleFactor,
		alpha : 1
	});
	scene.add(toWhomUnLockIcon);
	touchable.push(toWhomUnLockIcon);
	toWhomUnLockIcon.addEventListener('touchend', onToWhomIconTouch);
	isToWhomLocked = false;

	toWhomLockLabel = platino.createTextSprite({
		text : 'To Whom',
		fontSize : 18 / scaleFactor,
		x : 465 / scaleFactor,
		y : 55 / scaleFactor
	});
	toWhomLockLabel.width += 60;
	scene.add(toWhomLockLabel);
	touchable.push(toWhomLockLabel);
	toWhomLockLabel.addEventListener('touchend', onToWhomIconTouch);

	for (var i = 0, j = reels.reel1.numberOfSprites; i < j; i++) {
		reels.reel1.spriteNames[i] = "Reel1Frame" + String.format("%02d", i) + "@2X.png";
	};

	for (var i = 0, j = reels.reel2.numberOfSprites; i < j; i++) {
		reels.reel2.spriteNames[i] = "Reel2Frame" + String.format("%02d", i) + "@2X.png";
	};

	for (var i = 0, j = reels.reel3.numberOfSprites; i < j; i++) {
		reels.reel3.spriteNames[i] = "Reel3Frame" + String.format("%02d", i) + "@2X.png";
	};

	// Reel spritesheets
	reel1 = platino.createSpriteSheet({
		asset : 'graphics/Reels_Reel1' + suffix + '.xml',
		x : 25 / scaleFactor,
		y : 100 / scaleFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	reel1.selectFrame(reels.reel1.spriteNames[0]);
	scene.add(reel1);
	reel2 = platino.createSpriteSheet({
		asset : 'graphics/Reels_Reel2' + suffix + '.xml',
		x : 225 / scaleFactor,
		y : 100 / scaleFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	reel2.selectFrame(reels.reel2.spriteNames[0]);
	scene.add(reel2);
	reel3 = platino.createSpriteSheet({
		asset : 'graphics/Reels_Reel3' + suffix + '.xml',
		x : 425 / scaleFactor,
		y : 100 / scaleFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	reel3.selectFrame(reels.reel3.spriteNames[0]);
	scene.add(reel3);

	// Dimmers at top and bottom of screen
	// var borders = platino.createSprite({image:"graphics/mask.png"});
	// scene.add(borders);

	// Add the lever
	lever = platino.createSprite({
		image : "graphics/ball.png",
		x : 500 / scaleFactor,
		y : 600 / scaleFactor,
		width : 58 / scaleFactor,
		height : 58 / scaleFactor
	});
	scene.add(lever);
	touchable.push(lever);
	lever.addEventListener('touchend', onLeverTouch);

}

// Add coin text
// var coinText = platino.createTextSprite({text:"Coins: "+coins, fontSize:20,
// width:150, height:50, x:25,y:10});
// scene.add(coinText);

// Add spin text and light
// var spinText = platino.createTextSprite({text:"Spin:", fontSize:20, width:150,
// height:50, x:300, y:10});
// scene.add(spinText);
// var spinLight = platino.createSpriteSheet({image:"graphics/greenLight.png",
// width:35, height:35, x:350, y:5});
// scene.add(spinLight);

// Function to check reels
checkReel = function(reel) {
	if (reel.frame == 0 || reel.frame == 6 || reel.frame == 8) {
		reel.item = "cherry";
	} else if (reel.frame == 2) {
		reel.item = "bar";
	} else if (reel.frame == 4) {
		reel.item = "bell";
	} else if (reel.frame == 10) {
		reel.item = "melon";
	} else if (reel.frame == 12) {
		reel.item = "7";
	}
};

// Check reels, show particle effect if winning spin, allow user to spin again
var checkWin = function() {
	checkReel(reel1);
	checkReel(reel2);
	checkReel(reel3);

	if (reel1.item == reel2.item && reel1.item == reel3.item) {
		var particle = platino.createParticles({
			image : 'graphics/coinBurst.pex'
		});
		scene.add(particle);
		particle.move(240, 160);
	}
	canSpin = true;
};

var frames = [0, 2, 4, 6, 8, 10, 12];
// Stop the reels one by one, then check if user has won
var endRoll = function() {
	// Random values to stop at

	if (isGenderLocked == false) {
		var reel1Random = Math.floor((Math.random() * 2)) * 5;
		reel1.pauseAt(reel1Random);
	}

	if (isActivityLocked == false) {
		var reel2Random = Math.floor((Math.random() * 4)) * 8;
		setTimeout(function() {
			reel2.pauseAt(reel2Random);
		}, 500);
	}

	if (isToWhomLocked == false) {
		var reel3Random = Math.floor((Math.random() * 2)) * 5;
		setTimeout(function() {
			reel3.pauseAt(reel3Random);
		}, 1000);
	}
	if (isGenderLocked && isActivityLocked && isToWhomLocked) {
		checkWin();
	} else {
		setTimeout(checkWin, 1250);
	}
};

// Spin function
spin = function() {
	// If user is allowed to spin, spin the reels
	if (canSpin == true) {
		canSpin = false;
		// spinLight.frame = 1;
		if (isGenderLocked == false) {
			reel1.animate(0, 13, 50, -1);
		}

		if (isActivityLocked == false) {
			reel2.animate(0, 13, 70, -1);
		}

		if (isToWhomLocked == false) {
			reel3.animate(0, 13, 90, -1);
		}

		// Stop the reels randomly between .8 and 2.5 seconds
		var ranVal = Math.floor((Math.random() * 4000) + 800);
		if (isGenderLocked && isActivityLocked && isToWhomLocked) {
			endRoll();
		} else {
			setTimeout(endRoll, ranVal);
		}

	}
};

var TOUCH_SCALE = 1;

var onScreenTouch = function(e) {
	Ti.API.debug("BEGIN - onScreenTouch: " + JSON.stringify(e));
	var _event, i, sprite;

	// Create a new object to send with the event
	_event = {
		x : e.x * TOUCH_SCALE,
		y : e.y * TOUCH_SCALE
	};

	// iterate backwards so last items added to 'touchable' array
	// receive touch events first
	for ( i = touchable.length - 1; i >= 0; i--) {
		sprite = touchable[i];
		// Ti.API.debug('Checking sprite: x=' + sprite.x + ", y=" + sprite.y);

		// if sprite contains the touch coordinates, fire the event
		// if (sprite.containsWithPadding(_event.x, _event.y, 20, 10)) {
		if (sprite.contains(_event.x, _event.y)) {
			// Ti.API.debug('Sprite found!');
			sprite.fireEvent(e.type, _event);
			break;
		}
	}
};

////////////
game.addEventListener("touchstart", function(e) {
	Ti.API.debug("BEGIN - touchstart");
	onScreenTouch(e);
	/*
	 if (lever.contains(e.x, e.y) && lever.y > 45 && lever.y < 245) {
	 oY = lever.y - e.y;
	 }
	 */
});
game.addEventListener("touchmove", function(e) {
	Ti.API.debug("BEGIN - touchmove");
	onScreenTouch(e);
	/*
	 if (lever.contains(e.x, e.y) && lever.y > 45 && lever.y < 245) {
	 lever.y = e.y + oY;
	 }
	 */
});
////////////
// Listener to spin
game.addEventListener("touchend", function(e) {
	Ti.API.debug("BEGIN - touchend");
	onScreenTouch(e);
	/*
	 if (lever.y > 49) {
	 spin();
	 }
	 transform.duration = lever.y * 1.5;
	 lever.transform(transform);
	 */
});
////////////////////////////

game.addEventListener("onload", function(e) {
	Ti.API.debug("BEGIN - onload");
	Ti.API.info("game.screen = " + game.screen.width + " x " + game.screen.height);
	Ti.API.info("game.size = " + game.size.width + " x " + game.size.height);

	TOUCH_SCALE = game.screen.width / game.size.width;

	/*
	if (screenHeight >= 568) {
	screenHeight = 568;
	}
	game.touchScaleX = 1;
	game.touchScaleY = 1;
	game.touchScaleX = game.screen.width / game.size.width;
	game.touchScaleY = game.screen.height / game.size.height;
	*/

	// if (OS_ANDROID) {
	// var screenHeight =  game.size.height;
	// game.TARGET_SCREEN = {
	// width : Ti.Platform.displayCaps.platformWidth,
	// height : screenHeight
	// };
	// Ti.API.info("game.TARGET_SCREEN = " + game.TARGET_SCREEN.width + " x " + game.TARGET_SCREEN.height);
	// var screenScale = game.size.height / game.TARGET_SCREEN.height;
	// game.screen = {
	// width : game.size.width / screenScale,
	// height : game.size.height / screenScale
	// };
	// Ti.API.info("game.screen = " + game.screen.width + " x " + game.screen.height);
	// game.screenScale = 480 / game.TARGET_SCREEN.height;
	// Ti.API.info("screenScale = " + screenScale + ", game.screenScale = " + game.screenScale);
	// }
	// else {
	// game.screenScale = 1;
	// }

	initGameScene();

	// Start the game
	game.start();

	Ti.Gesture.addEventListener('shake', function(e) {
		spin();
	});

});

function init() {
	Ti.API.trace('ShakeIt.' + arguments.callee.name);
	// Add objects and open game window
	$.shakeItWin.add(game);

}

function open() {
	init();
}
