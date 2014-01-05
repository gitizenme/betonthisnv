// Loader
// Description: use this object to create loaders that work in
// iOS and Android. Be sure to pass options into the Create function
// if you would like to customized the look of this control

function Loader() {

	var _loaderContainer = null;
	var _loader = null;
	var _isOpen = false;

	var _getStyle = function() {
		var style;
		if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad')
			style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
		else
			style = Ti.UI.ActivityIndicatorStyle.BIG;
		return style;
	};

	var _onAndroidBack = function(e) {
		Ti.API.debug('Loader._onAndroidBack');
		// do nothing
	};

	this.getView = function() {
		return _loaderContainer;
	};

	this.Open = function() {
		Ti.API.debug('Loader.Open' + arguments.callee.name);
		if (_isOpen == false) {
			if (OS_IOS) {
				var openArgs = {
					modal : true,
					modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
					modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
				};
			}
			if (OS_ANDROID) {
				var openArgs = {
					modal : true,
					activityEnterAnimation : Ti.Android.R.anim.fade_in,
					activityExitAnimation : Ti.Android.R.anim.fade_out
				};
			}
			_loaderContainer.open(openArgs);
			_isOpen = true;
			_loader.show();
		}
	};

/*
	this.Show = function() {
		Ti.API.debug('Loader.' + arguments.callee.name);
		this.Open();
		if (_isOpen) {
			_loaderContainer.show();
		}
	};

	this.Hide = function() {
		Ti.API.debug('Loader.' + arguments.callee.name);
		if (_isOpen) {
			_loaderContainer.hide();
			_loader.hide();
		}
	};
*/

	this.Close = function() {
		Ti.API.debug('Loader.Close' + arguments.callee.name);
		if (_isOpen) {
			_loaderContainer.close();
			_loader.hide();
			_isOpen = false;
		}
		if (OS_ANDROID) {
			_loaderContainer.removeEventListener('androidback', _onAndroidBack);
		}
	};

	this.Create = function(message, options) {
		Ti.API.debug('Loader.Create' + arguments.callee.name);
		var options = options == undefined ? {} : options;
		//create an empty object if not passed in
		var loaderStyle = _getStyle();
		_loaderContainer = Ti.UI.createWindow({
			// _loaderContainer = Ti.UI.createView({
			backgroundColor : options.backgroundColor == undefined ? "#000" : options.backgroundColor,
			opacity : options.opacity ? options.opacity : 0.8,
			borderRadius : options.borderRadius ? options.borderRadius : 0,
			layout : options.rightLoader || options.leftLoader ? "horizontal" : "vertical",
			borderWidth : options.borderWidth ? options.borderWidth : 0,
			borderColor : options.borderColor ? options.borderColor : "transparent",
			top : options.top ? options.top : 0,
			visible : options.visible ? options.visible : true,
			width : options.width ? options.width : Ti.UI.FILL,
			height : options.height ? options.height : Ti.UI.FILL
		});

		if (OS_ANDROID) {
			_loaderContainer.addEventListener('androidback', _onAndroidBack);
		}

		var centerView = Ti.UI.createView({
			layout : "horizontal",
			left : "10%",
			top : "35%"
		});
		var label = Ti.UI.createLabel({
			top : options.rightLoader || options.leftLoader ? "" : "10",
			color : options.color ? options.color : "#fff",
			text : message ? message : "Loading...",
			font : {
				fontSize : 16,
				fontWeight : "bold"
			}
		});
		_loader = Ti.UI.createActivityIndicator({
			top : options.rightLoader || options.leftLoader ? "" : "25%",
			style : loaderStyle
		});
		//Loader Positioning
		if (options.rightLoader) {
			centerView.add(label);
			_loader.left = 10;
			centerView.add(_loader);
			_loaderContainer.add(centerView);
		} else if (options.leftLoader) {
			centerView.add(_loader);
			_loader.right = 10;
			centerView.add(label);
			_loaderContainer.add(centerView);
		} else {
			_loaderContainer.add(_loader);
			_loaderContainer.add(label);
		}
		_loaderContainer.add(_loader);
	};

}

module.exports = Loader;
