function Controller() {
    function doneClicked() {
        $.BetOnThisNVWebView.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BetOnThisNVWebView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.BetOnThisNVWebView = Ti.UI.createWindow({
        id: "BetOnThisNVWebView"
    });
    $.__views.BetOnThisNVWebView && $.addTopLevelView($.__views.BetOnThisNVWebView);
    $.__views.__alloyId1923 = Ti.UI.createView({
        backgroundColor: "gray",
        id: "__alloyId1923"
    });
    $.__views.BetOnThisNVWebView.add($.__views.__alloyId1923);
    $.__views.swv = Alloy.createWidget("com.orthlieb.scrollablewebview", "widget", {
        top: 0,
        left: 0,
        right: 0,
        bottom: "50 dp",
        backgroundColor: "#fff",
        pagingControlStyle: "toolbar",
        showPagingControl: "off",
        webView: {
            scalesPageToFit: false,
            enableZoomControls: false
        },
        prevButton: {
            backgroundImage: "images/airplane.png",
            backgroundDisabledImage: "images/airplane.png"
        },
        nextButton: {
            backgroundImage: "images/airplane.png",
            backgroundDisabledImage: "images/airplane.png"
        },
        id: "swv",
        __parentSymbol: $.__views.__alloyId1923
    });
    $.__views.swv.setParent($.__views.__alloyId1923);
    $.__views.__alloyId1924 = Ti.UI.createButton({
        title: "Close",
        bottom: "2 dp",
        id: "__alloyId1924"
    });
    $.__views.__alloyId1923.add($.__views.__alloyId1924);
    doneClicked ? $.__views.__alloyId1924.addEventListener("click", doneClicked) : __defers["$.__views.__alloyId1924!click!doneClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.swv.urlArray = [ "http://betonthisnv.org/", "http://betonthisnv.org/gettested/", "http://betonthisnv.org/findcondoms/" ];
    $.swv.currentPage = null !== args.targetPage ? args.targetPage : 0;
    $.BetOnThisNVWebView.open();
    __defers["$.__views.__alloyId1924!click!doneClicked"] && $.__views.__alloyId1924.addEventListener("click", doneClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;