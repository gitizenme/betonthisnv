function Controller() {
    function doPrevMonth() {
        var widget;
        $.calendar.remove($.calendar.children[0]);
        currentMonth.subtract("months", 1);
        widget = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
            period: currentMonth
        });
        $.calendar.add(widget.getView());
    }
    function doNextMonth() {
        var widget;
        $.calendar.remove($.calendar.children[0]);
        currentMonth.add("months", 1);
        widget = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
            period: currentMonth
        });
        $.calendar.add(widget.getView());
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
    $.__views.calendarWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "calendarWin",
        title: "My Calendar",
        layout: "vertical"
    });
    $.__views.__alloyId1 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId1"
    });
    $.__views.calendarWin.add($.__views.__alloyId1);
    $.__views.prevMonth = Ti.UI.createButton({
        left: 0,
        id: "prevMonth",
        title: "<"
    });
    $.__views.__alloyId1.add($.__views.prevMonth);
    doPrevMonth ? $.__views.prevMonth.addEventListener("click", doPrevMonth) : __defers["$.__views.prevMonth!click!doPrevMonth"] = true;
    $.__views.nextMonth = Ti.UI.createButton({
        right: 0,
        id: "nextMonth",
        title: ">"
    });
    $.__views.__alloyId1.add($.__views.nextMonth);
    doNextMonth ? $.__views.nextMonth.addEventListener("click", doNextMonth) : __defers["$.__views.nextMonth!click!doNextMonth"] = true;
    $.__views.calendar = Ti.UI.createView({
        id: "calendar"
    });
    $.__views.calendarWin.add($.__views.calendar);
    $.__views.current = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
        id: "current",
        __parentSymbol: $.__views.calendar
    });
    $.__views.current.setParent($.__views.calendar);
    $.__views.calendarTab = Ti.UI.createTab({
        window: $.__views.calendarWin,
        id: "calendarTab",
        title: "Calendar",
        icon: "images/airplane.png"
    });
    $.__views.index.addTab($.__views.calendarTab);
    $.__views.__alloyId3 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Care Diary",
        id: "__alloyId3"
    });
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Diary View",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId2 = Ti.UI.createTab({
        window: $.__views.__alloyId3,
        title: "Diary",
        icon: "images/airplane.png",
        id: "__alloyId2"
    });
    $.__views.index.addTab($.__views.__alloyId2);
    $.__views.__alloyId6 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Eligibility Album",
        id: "__alloyId6"
    });
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Eligibility View",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        title: "Eligibilty",
        icon: "images/airplane.png",
        id: "__alloyId5"
    });
    $.__views.index.addTab($.__views.__alloyId5);
    $.__views.__alloyId9 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Get Help",
        id: "__alloyId9"
    });
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Help View",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9,
        title: "Help",
        icon: "images/airplane.png",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var moment = require("alloy/moment");
    var currentMonth = moment();
    $.calendar.addEventListener("click", function() {
        var selectedDate = $.current.selectedDate();
        Ti.API.info(selectedDate.format("MMM"));
    });
    $.index.open();
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;