// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Ti.App.forceSplashAsSnapshot = true;
Ti.UI.setBackgroundColor('#2399A3');


if( OS_ANDROID ) {
    Alloy.Globals.Android = { 
        "Api" : Ti.Platform.Android.API_LEVEL
    };
}

var Loader = require('Loader');
Alloy.Globals.loader = new Loader();
Alloy.Globals.loader.Create("Loading...", {
	color : "#fff",
	backgroundColor : "#2399A3"
});

Alloy.Globals.resumeLoader = new Loader();
Alloy.Globals.resumeLoader.Create("Loading...", {
	color : "#fff",
	backgroundColor : "#2399A3",
	opacity: 1
});


Alloy.Globals.version = "0.0.0 DEV";

Alloy.Globals.FirstTimeUse = false;
Alloy.Globals.UserAuthenticated = false;
Alloy.Globals.AuthenticateOnResume = true;
Alloy.Globals.CurrentOpenWindow = null;

Alloy.Collections.users = Alloy.Collections.instance("user");
Alloy.Collections.users.fetch();
Ti.API.debug("Number of users: " + Alloy.Collections.users.length);

Alloy.Collections.journal = Alloy.Collections.instance("journal");
Alloy.Collections.journal.fetch();
Ti.API.debug("Number of journal entries: " + Alloy.Collections.journal.length);



