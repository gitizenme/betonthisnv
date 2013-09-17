
var args = arguments[0] || {};


function doneClicked(e) {
    $.BetOnThisNVWebView.close();
}

$.swv.urlArray = ["http://betonthisnv.org/", "http://betonthisnv.org/gettested/", "http://betonthisnv.org/findcondoms/"];
$.swv.currentPage = (args.targetPage !== null) ? args.targetPage : 0;
$.BetOnThisNVWebView.open();
