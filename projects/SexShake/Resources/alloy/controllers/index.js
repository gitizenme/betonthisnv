function Controller() {
    function getTestedClicked(e) {
        Ti.API.debug("index." + arguments.callee.name + ": " + JSON.stringify(e));
        var arg = {
            targetPage: 1
        };
        Alloy.createController("BetOnThisNVWebView", arg).getView();
    }
    function findCondomsClicked(e) {
        Ti.API.debug("index." + arguments.callee.name + ": " + JSON.stringify(e));
        var arg = {
            targetPage: 2
        };
        Alloy.createController("BetOnThisNVWebView", arg).getView();
    }
    function emailSendComplete(e) {
        Ti.API.debug("index." + arguments.callee.name + ": " + JSON.stringify(e));
        e.success ? alert("Message sent!") : alert("Unable to send message, please try again later.");
    }
    function getHelpClicked(e) {
        Ti.API.debug("index." + arguments.callee.name + ": " + JSON.stringify(e));
        var emailDialog = Ti.UI.createEmailDialog();
        if (emailDialog.isSupported()) {
            emailDialog.subject = "Bet On This NV: Get Help";
            emailDialog.toRecipients = [ "info@izen.me" ];
            emailDialog.html = true;
            emailDialog.messageBody = "<ul><li>Your Name:</li><li>Phone number:</li><li>Message:</li></ul>";
            emailDialog.addEventListener("comnplete", emailSendComplete);
            emailDialog.open({
                animated: true
            });
        } else alert("E-mail not available. Please create an e-mail account on your mobile device.");
    }
    function checkForAppReset() {
        Ti.API.trace("index." + arguments.callee.name);
        var appSettingsReset = Ti.App.Properties.getString("reset_preference", "NO");
        Titanium.API.debug("reset_preference:" + appSettingsReset);
        if ("YES" === appSettingsReset) {
            Ti.App.Properties.setString("version_preference", "");
            Ti.App.Properties.setString("reset_preference", "NO");
        }
    }
    function init() {
        Ti.API.trace("index." + arguments.callee.name);
        checkForAppReset();
        if ("" == Ti.App.Properties.getString("version_preference", "")) {
            prodVersion = Ti.App.version + "-GA";
            Ti.App.Properties.setString("version_preference", prodVersion);
        }
        Ti.API.debug("prodVersion = " + prodVersion);
        $.reels.init();
    }
    function open() {
        Ti.API.trace("index." + arguments.callee.name);
        init();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.sex_shake = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "sex_shake",
        title: "Sex Shake"
    });
    $.__views.sex_shake_web = Alloy.createWidget("com.orthlieb.info", "widget", {
        icon: "images/airplane.png",
        text: "BetOnThisNV",
        id: "sex_shake_web",
        __parentSymbol: $.__views.sex_shake
    });
    $.__views.sex_shake_web.setParent($.__views.sex_shake);
    $.__views.reels = Alloy.createWidget("me.izen.Reels", "widget", {
        id: "reels",
        __parentSymbol: $.__views.sex_shake
    });
    $.__views.reels.setParent($.__views.sex_shake);
    $.__views.shakeItTab = Ti.UI.createTab({
        icon: "images/airplane.png",
        window: $.__views.sex_shake,
        title: "Shake It",
        id: "shakeItTab"
    });
    $.__views.index.addTab($.__views.shakeItTab);
    $.__views.info = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "info",
        title: "Info"
    });
    $.__views.info_web = Alloy.createWidget("com.orthlieb.info", "widget", {
        icon: "images/airplane.png",
        text: "BetOnThisNV",
        id: "info_web",
        __parentSymbol: $.__views.info
    });
    $.__views.info_web.setParent($.__views.info);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        id: "scrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%",
        width: "80%"
    });
    $.__views.info.add($.__views.scrollView);
    $.__views.__alloyId1926 = Ti.UI.createView({
        borderRadius: "7 dp",
        borderColor: "black",
        backgroundColor: "darkgray",
        top: "5 dp",
        height: "30%",
        width: "auto",
        id: "__alloyId1926"
    });
    $.__views.scrollView.add($.__views.__alloyId1926);
    $.__views.__alloyId1927 = Ti.UI.createButton({
        width: "200dp",
        title: "Get Tested",
        id: "__alloyId1927"
    });
    $.__views.__alloyId1926.add($.__views.__alloyId1927);
    getTestedClicked ? $.__views.__alloyId1927.addEventListener("click", getTestedClicked) : __defers["$.__views.__alloyId1927!click!getTestedClicked"] = true;
    $.__views.__alloyId1928 = Ti.UI.createView({
        borderRadius: "7 dp",
        borderColor: "black",
        backgroundColor: "darkgray",
        top: "5 dp",
        height: "30%",
        width: "auto",
        id: "__alloyId1928"
    });
    $.__views.scrollView.add($.__views.__alloyId1928);
    $.__views.__alloyId1929 = Ti.UI.createButton({
        width: "200dp",
        title: "Find Condoms",
        id: "__alloyId1929"
    });
    $.__views.__alloyId1928.add($.__views.__alloyId1929);
    findCondomsClicked ? $.__views.__alloyId1929.addEventListener("click", findCondomsClicked) : __defers["$.__views.__alloyId1929!click!findCondomsClicked"] = true;
    $.__views.__alloyId1930 = Ti.UI.createView({
        borderRadius: "7 dp",
        borderColor: "black",
        backgroundColor: "darkgray",
        top: "5 dp",
        height: "30%",
        width: "auto",
        id: "__alloyId1930"
    });
    $.__views.scrollView.add($.__views.__alloyId1930);
    $.__views.__alloyId1931 = Ti.UI.createButton({
        width: "200dp",
        title: "Get Help",
        id: "__alloyId1931"
    });
    $.__views.__alloyId1930.add($.__views.__alloyId1931);
    getHelpClicked ? $.__views.__alloyId1931.addEventListener("click", getHelpClicked) : __defers["$.__views.__alloyId1931!click!getHelpClicked"] = true;
    $.__views.infoTab = Ti.UI.createTab({
        icon: "images/airplane.png",
        window: $.__views.info,
        title: "Info",
        id: "infoTab"
    });
    $.__views.index.addTab($.__views.infoTab);
    $.__views.index && $.addTopLevelView($.__views.index);
    open ? $.__views.index.addEventListener("open", open) : __defers["$.__views.index!open!open"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.sex_shake_web.init($.sex_shake);
    $.sex_shake_web.on("click", function(e) {
        Ti.API.debug("index." + arguments.callee.name + ": " + JSON.stringify(e));
        var arg = {
            targetPage: 0
        };
        Alloy.createController("BetOnThisNVWebView", arg).getView();
    });
    $.info_web.init($.info);
    $.info_web.on("click", function(e) {
        Ti.API.debug("index." + arguments.callee.name + ": " + JSON.stringify(e));
        var arg = {
            targetPage: 0
        };
        Alloy.createController("BetOnThisNVWebView", arg).getView();
    });
    var prodVersion = Ti.App.Properties.getString("version_preference", "0.0.0-DEV");
    $.index.open();
    __defers["$.__views.__alloyId1927!click!getTestedClicked"] && $.__views.__alloyId1927.addEventListener("click", getTestedClicked);
    __defers["$.__views.__alloyId1929!click!findCondomsClicked"] && $.__views.__alloyId1929.addEventListener("click", findCondomsClicked);
    __defers["$.__views.__alloyId1931!click!getHelpClicked"] && $.__views.__alloyId1931.addEventListener("click", getHelpClicked);
    __defers["$.__views.index!open!open"] && $.__views.index.addEventListener("open", open);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;