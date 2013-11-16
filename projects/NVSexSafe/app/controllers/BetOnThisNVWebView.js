
var args = arguments[0] || {};


function doneClicked(e) {
    $.BetOnThisNVWebView.close();
}

$.swv.urlArray = ["http://betonthisnv.org/", "http://betonthisnv.org/Protect/NV_Testing_Locations/", "http://betonthisnv.org/Protect/Get_Free_Condoms/"];
$.swv.currentPage = (args.targetPage !== null) ? args.targetPage : 0;
$.BetOnThisNVWebView.open();
